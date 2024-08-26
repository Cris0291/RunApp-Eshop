using Contracts.StoreOwnerProfiles.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RunApp.Api.Routes;

namespace RunApp.Api.Controllers.StoreOwnerProfiles
{
   
    public class StoreOwnerProfileController : ApiController
    {
        [HttpPost(ApiEndpoints.StoreOwnerProfiles.CreateStoreOwnerProfile)]
        public async Task<IActionResult> CreateStoreOwnerProfile(StoreOwnerProfileRequest storeOwnerProfileRequest)
        {
            
        }
    }
}
