using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RunApp.Api.Contracts;
using RunApp.Api.Routes;
using RunnApp.Application.Photos.Commands.AddProductPhoto;
using RunApp.Api.Services;
using RunApp.Api.Mappers.Photos;

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
    }
}
