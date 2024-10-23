using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RunApp.Api.Controllers.Photos
{
    public class PhotoController : ApiController
    {
        [Authorize]
        [HttpPost]
        public Task<IActionResult> AddPhoto([FromBody] IFormFile photo)
        {

        }
    }
}
