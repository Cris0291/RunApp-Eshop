using Contracts.Accounts.Request;
using Contracts.Accounts.Response;
using ErrorOr;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RunApp.Api.Routes;
using RunApp.Api.Services;
using RunApp.Domain.Common;
using RunApp.Domain.UserAggregate;
using RunApp.Domain.UserAggregate.Events;
using System.Diagnostics.Eventing.Reader;

namespace RunApp.Api.Controllers
{

    [AllowAnonymous]
    [ApiController]
    public class AccountController(UserManager<AppUser> userManager, IJwtServiceGenerator jwtServiceGenerator, IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly IJwtServiceGenerator _jwtServiceGenerator = jwtServiceGenerator;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

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
            AppUser? user =  await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return BadRequest("User was not found. Wrong email");

           bool passwordResult =  await _userManager.CheckPasswordAsync(user,loginDto.Password);

            if(!passwordResult) return BadRequest(new ProblemDetails()
            {
                Status = 500,
                Title = "An unexpected error happened",
                Detail = "User password was incorrect",

            });

            var token = _jwtServiceGenerator.GenerateJwtToken(user);
            UserDto userDto = new UserDto(user.UserName!, user.NickName, token, user.Email!);
            return Ok(userDto);
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
    }
}
