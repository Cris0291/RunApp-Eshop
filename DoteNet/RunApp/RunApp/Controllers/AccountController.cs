using Contracts.Accounts.Request;
using Contracts.Accounts.Response;
using Contracts.Common;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RunApp.Api.Routes;
using RunApp.Api.Services;
using RunApp.Domain.Common;
using RunApp.Domain.UserAggregate;
using RunApp.Domain.UserAggregate.Events;
using RunnApp.Application.StoreOwnerProfiles.Commands.LoginStoreOwnerProfile;

namespace RunApp.Api.Controllers
{

    [AllowAnonymous]
    [ApiController]
    public class AccountController(UserManager<AppUser> userManager, IJwtServiceGenerator jwtServiceGenerator, IHttpContextAccessor httpContextAccessor, ISender mediator) : ApiController
    {
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly IJwtServiceGenerator _jwtServiceGenerator = jwtServiceGenerator;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly ISender _mediator = mediator;

        [HttpPost(ApiEndpoints.Account.Register)]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {

            var isUserNickNameTaken = await _userManager.Users.AnyAsync(x => x.NickName == registerDto.NickName);
            if (isUserNickNameTaken) return BadRequest("User nickname was already registerd");

            var isUserEmailTaken = await _userManager.Users.AnyAsync(x =>  x.Email == registerDto.Email);
            if (isUserEmailTaken) return BadRequest("User email was already registerd");

            AppUser newUser = new AppUser()
            {
                Email = registerDto.Email,
                UserName = registerDto.UserName,
                NickName = registerDto.NickName,
            };

           IdentityResult result = await _userManager.CreateAsync(newUser, registerDto.Password);

            if (result.Succeeded)
            {
                var token = _jwtServiceGenerator.GenerateJwtToken(newUser);
                AddCustomerProfileEvent(_httpContextAccessor, newUser);
                UserDto userDto = new UserDto(newUser.UserName, newUser.NickName,token, newUser.Email);
                
                return Ok(userDto);
            }

            var errorDetails = result.Errors.Select(error => error.Description); 

            return BadRequest(new ProblemDetails()
            {
                Status = 500,
                Title = "An unexpected error happened",
                Detail = string.Join(",", errorDetails),

            });
        }

        [HttpPost(ApiEndpoints.Account.Login)]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var userOrError = await GetUser(_userManager, loginDto);
            if (userOrError.IsError) return Problem(userOrError.Errors);
            var user = userOrError.Value;

            var token = _jwtServiceGenerator.GenerateJwtToken(user);
            UserDto userDto = new UserDto(user.UserName!, user.NickName, token, user.Email!);
            return Ok(userDto);
        }

        [HttpPost(ApiEndpoints.Account.LoginSalesProfile)]
        public async Task<IActionResult> LoginSalesProfile(LoginDto loginDto)
        {
            var userOrError = await GetUser(_userManager, loginDto);
            if (userOrError.IsError) return Problem(userOrError.Errors);
            var user = userOrError.Value;

            var result = await _mediator.Send(new LoginStoreOwnerProfielCommand(user.Id));

            return result.MatchFirst(value =>
            {
                var token = _jwtServiceGenerator.GenerateJwtToken(storeProfile: value, customClaims: [new CustomClaim() { Key = "StoreProfile", Value = "true"}]);
                StoreUserDto storeUserDto = new(user.UserName, user.NickName, user.Email, value.StoreName, value.SalesLevel.Name, value.StoreProfileId, token);
                return Ok(storeUserDto);
            }, Problem);
        }

        [HttpGet(ApiEndpoints.Account.Logout)]
        public async Task<IActionResult> Logout()
        {
            //ControllerContext.HttpContext.Response.Headers.Remove("Authorization");

            return Ok();
        }

        private void AddCustomerProfileEvent(IHttpContextAccessor httpContextAccessor, AppUser user)
        {
            Queue<IDomainEvent> domainEventsQueue =  httpContextAccessor.HttpContext!.Items.TryGetValue("DomainEvents", out var events)  && events is Queue<IDomainEvent> domainEvents ? domainEvents : new Queue<IDomainEvent>();
            var profileEvent = new CreateCustomerProfileEvent(user.Id, user.Email!, user.UserName!, user.NickName);
            domainEventsQueue.Enqueue(profileEvent);

            httpContextAccessor.HttpContext!.Items["DomainEvents"] = domainEventsQueue;
        }
        private async  Task<ErrorOr<AppUser>> GetUser(UserManager<AppUser> userManager, LoginDto loginDto)
        {
            var listOfErrors = new List<Error>();
            AppUser? user = await userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) listOfErrors.Add(Error.NotFound(code: "UserWasNotFoundWrongEmail", description: "User was not found. Wrong email"));

            bool passwordResult = await userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!passwordResult) listOfErrors.Add(Error.NotFound(code: "UserPsswordWaIncorrect", description: "User password was incorrect"));

            if(listOfErrors.Count > 0) return listOfErrors;

            return user;
        }
    }
}
