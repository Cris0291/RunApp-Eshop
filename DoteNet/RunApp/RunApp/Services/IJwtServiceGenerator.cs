using RunApp.Domain.UserAggregate;

namespace RunApp.Api.Services
{
    public interface IJwtServiceGenerator
    {
        string GenerateJwtToken(AppUser user);
    }
}