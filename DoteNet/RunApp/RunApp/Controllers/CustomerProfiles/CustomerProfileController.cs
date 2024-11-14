using Contracts.Common;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RunApp.Api.Mappers.CustomerProfile;
using RunApp.Api.Mappers.Orders;
using RunApp.Api.Mappers.Products;
using RunApp.Api.Routes;
using RunApp.Api.Services;
using RunnApp.Application.CustomerProfiles.Commands.AddAddress;
using RunnApp.Application.CustomerProfiles.Commands.AddPaymentMethod;
using RunnApp.Application.CustomerProfiles.Commands.UpdateAddress;
using RunnApp.Application.CustomerProfiles.Commands.UpdatePaymentMethod;
using RunnApp.Application.CustomerProfiles.Queries.GetUserBoughtProducts;
using RunnApp.Application.CustomerProfiles.Queries.GetUserLikes;
using RunnApp.Application.CustomerProfiles.Queries.GetUserRatings;
using RunnApp.Application.CustomerProfiles.Queries.GetUserReviews;

namespace RunApp.Api.Controllers.CustomerProfiles
{
    public class CustomerProfileController(ISender mediator) : ApiController
    {
        private readonly ISender _mediator = mediator;

        [Authorize]
        [HttpGet(ApiEndpoints.CustomerProfiles.GetUserReviews)]
        public async Task<IActionResult> GetReviews()
        {
            Guid userId = HttpContext.GetUserId();
            var userReviews = await _mediator.Send(new GetUserReviewsQuery(userId));

            return userReviews.MatchFirst(Ok, Problem);
        }

        [Authorize]
        [HttpGet(ApiEndpoints.CustomerProfiles.GetUserRatings)]
        public async Task<IActionResult> GetRatings()
        {
            Guid userId = HttpContext.GetUserId();
            var userRatings = await _mediator.Send(new GetUserRatingsQuery(userId));

            return userRatings.MatchFirst(Ok, Problem);
        }

        [Authorize]
        [HttpGet(ApiEndpoints.CustomerProfiles.GetUserLikes)]
        public async Task<IActionResult> GetLikes()
        {
            Guid userId = HttpContext.GetUserId();

            var userLikes = await _mediator.Send(new GetUserLikesQuery(userId));

            return Ok(userLikes);
        }

        [Authorize]
        [HttpGet(ApiEndpoints.CustomerProfiles.GetUserBoughtProducts)]
        public async Task<IActionResult> GetBoughtProducts()
        {
            Guid userId = HttpContext.GetUserId();
            var productWithImage =await _mediator.Send(new GetUserBoughtProductsQuery(userId));

            return productWithImage.Match(value => Ok(value.ProductsWithImageToProductsResponse()), Problem);
        }

        [Authorize]
        [HttpPost(ApiEndpoints.CustomerProfiles.AddAddress)]
        public async Task<IActionResult> AddAddress([FromBody] AddressRequest addressRequest)
        {
            Guid userId = HttpContext.GetUserId();

            var result = await _mediator.Send(new AddAddressCommand(userId, addressRequest.ZipCode, addressRequest.Street, addressRequest.City, addressRequest.HouseNumber, addressRequest.Country, addressRequest.State));

            return result.Match(value => Ok(value.FromAddressToAddressResponse()), Problem);
        }

        [Authorize]
        [HttpPost(ApiEndpoints.CustomerProfiles.AddPaymenthMethod)]
        public async Task<IActionResult> AddPaymentMethod([FromBody] CardRequest cardRequest)
        {
            Guid userId = HttpContext.GetUserId();

            var result = await _mediator.Send(new AddPaymentMethodCommand(userId, cardRequest.HoldersName, cardRequest.CardNumber, cardRequest.CVV, cardRequest.ExpiryDate));

            return result.MatchFirst(value => Ok(value.FromCardToCardDto()), Problem);
        }

        [Authorize]
        [HttpPut(ApiEndpoints.CustomerProfiles.UpdateAddress)]
        public async Task<IActionResult> UpdateAddres([FromBody] AddressRequest addressRequest)
        {
            Guid userId = HttpContext.GetUserId();

            var result = await _mediator.Send(new UpdateAddressCommand(userId, addressRequest.ZipCode, addressRequest.Street, addressRequest.City, addressRequest.HouseNumber, addressRequest.Country, addressRequest.State));

            return result.MatchFirst(value => Ok(value.FromAddressToAddressResponse()), Problem);
        }

        [Authorize]
        [HttpPut(ApiEndpoints.CustomerProfiles.UpdatePaymentMethod)]
        public async Task<IActionResult> UpdatePaymentMethod([FromBody] CardRequest cardRequest)
        {
            Guid userId = HttpContext.GetUserId();

            var result = await _mediator.Send(new UpdatePaymentMethodCommand(userId, cardRequest.HoldersName, cardRequest.CardNumber, cardRequest.CVV, cardRequest.ExpiryDate));

            return result.MatchFirst(value => Ok(value.FromCardToCardDto()), Problem);
        } 
    }
}
