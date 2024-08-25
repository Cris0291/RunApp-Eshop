using Contracts.ProductStatuses.Requests;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RunApp.Api.Routes;
using RunApp.Api.Services;
using RunnApp.Application.ProductStatuses.Commands.AddProductStatus;

namespace RunApp.Api.Controllers.ProductStatuses
{
   
    public class ProductStatusController(ISender mediator) : ApiController
    {
        private readonly ISender _mediator = mediator;

        [Authorize]

        [HttpPut(ApiEndpoints.Products.AddProductStatus)]
        public async Task<IActionResult> AddProductStatus(ProductStatusRequest productStatusRequest, [FromRoute] Guid id)
        {
            Guid userId = HttpContext.GetUserId();
            var productStatusCommand = new AddProductStatusCommand(id, userId, productStatusRequest.Like, productStatusRequest.Dislike, productStatusRequest.Viewed, productStatusRequest.Bought);

            var result = await _mediator.Send(productStatusCommand);

            return result.MatchFirst((value) => Ok(), Problem);
        }
    }
}
