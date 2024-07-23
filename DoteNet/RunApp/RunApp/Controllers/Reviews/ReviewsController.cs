using Contracts.Reviews.Requests;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RunApp.Api.Routes;

namespace RunApp.Api.Controllers.Reviews
{
    
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        [HttpPost(ApiEndpoints.Products.AddReview)]
        public async Task<IActionResult> AddReview([FromRoute] Guid ProductId, AddReviewRequest reviewRequest)
        {

        }
    }
}
