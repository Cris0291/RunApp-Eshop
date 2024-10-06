using Contracts.Rates.Requests;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RunApp.Api.Routes;
using RunApp.Api.Services;
using RunnApp.Application.Ratings.Commands;

namespace RunApp.Api.Controllers.Ratings
{

    public class RatingsController(ISender mediator) : ApiController
    {
        private readonly ISender _mediator = mediator;

        [Authorize]
        [HttpPost(ApiEndpoints.Products.AddRating)]
        public async Task<IActionResult> RateProduct(AddRatingRequest ratingRequest, [FromRoute] Guid id)
        {
            Guid userId = HttpContext.GetUserId();

            var ratingCommand = new AddRatingCommand(HttpContext.User, id, userId, ratingRequest.Rating);

            var result = await _mediator.Send(ratingCommand);

            return result.Match(value => Ok(), Problem);
        }
    }
}
