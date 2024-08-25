using Microsoft.IdentityModel.Tokens;
using RunApp.Domain.UserAggregate;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RunApp.Api.Services
{
    public class JwtServiceGenerator(IConfiguration configuration) : IJwtServiceGenerator
    {
        private readonly IConfiguration _configuration = configuration;
        public string GenerateJwtToken(AppUser user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name,  user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.NickName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
                new Claim("UserId", user.Id.ToString())
            };
         
            var securityToken = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims,expires: DateTime.UtcNow.AddMinutes(5), signingCredentials: signCredentials);
           
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            string token = jwtTokenHandler.WriteToken(securityToken);
            return token;
        }
    }
}
