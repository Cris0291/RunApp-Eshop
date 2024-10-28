using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RunApp.Api.Contracts;
using RunApp.Api.Routes;
using RunnApp.Application.Photos.Commands.AddProductPhoto;
using RunApp.Api.Services;
using RunApp.Api.Mappers.Photos;
using RunnApp.Application.Photos.Commands.RemoveProductPhoto;

namespace RunApp.Api.Controllers.Photos
{
    public class PhotoController(ISender mediator) : ApiController
    {
        private readonly ISender _mediator = mediator;

        [Authorize("StoreProfile")]
        [HttpPost(ApiEndpoints.Products.AddPhoto)]
        public async Task<IActionResult> AddProductPhoto([FromBody] PhotoRequestDto photoRequest)
        {
            Guid storeOwnerId = HttpContext.GetStoreOwnerId();
            var result = await _mediator.Send(new AddProductPhotoCommand(photoRequest.ProductId, storeOwnerId, photoRequest.photo));

            return result.MatchFirst(value => Ok(value.PhotoResultToPhotoResponse()), Problem);
        }
        [Authorize("StoreProfile")]
        [HttpDelete(ApiEndpoints.Products.RemovePhoto)]
        public async Task<IActionResult> RemovePhoto([FromRoute] Guid productId, [FromRoute] string photoId)
        {
            Guid storeOwnerId = HttpContext.GetStoreOwnerId();
            var result = await _mediator.Send(new RemoveProductPhotoCommand(productId, storeOwnerId, photoId));

            return result.MatchFirst(value => Ok(), Problem);
        }
    }
}
