using Contracts.Common;
using Contracts.StoreOwnerProfiles.Response;
using RunApp.Domain.StoreOwnerProfileAggregate;
using RunApp.Domain.UserAggregate;

namespace RunApp.Api.Services
{
    public interface IJwtServiceGenerator
    {
        string GenerateJwtToken(AppUser? user = null, StoreOwnerProfile? storeProfile = null, CustomClaim[]? customClaims = null);
    }
}