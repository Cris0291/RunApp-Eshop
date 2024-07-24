using Contracts.Reviews.Requests;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RunApp.Api.Routes;
using RunApp.Domain.ProductAggregate.Reviews.Common;
using RunApp.Api.Mappers.Reviews;
using RunnApp.Application.Reviews.Commands.CreateReview;
using MediatR;
using ErrorOr;
using RunApp.Domain.ProductAggregate.Reviews;


namespace RunApp.Api.Controllers.Reviews
{
    
    [ApiController]
    public class ReviewsController(IMediator mediator) : BaseApiController
    {
        private readonly IMediator _mediator = mediator;
        [HttpPost(ApiEndpoints.Products.AddReview)]
        public async Task<IActionResult> AddReview([FromRoute] Guid ProductId, AddReviewRequest reviewRequest)
        {
           ReviewDescriptionEnums reviewEnum = ReviewDescriptionEnums.FromName(reviewRequest.reviewDescription.ToString());
           CreateReviewCommand reviewCommand = reviewRequest.ReviewRequestToReviewCommand(ProductId,reviewEnum);

            ErrorOr<Review> reviewsOrError = await _mediator.Send(reviewCommand);

            //Should include the user id in order to return created at and not ok
            return reviewsOrError.Match( Ok, Problem);
        }

        [HttpDelete(ApiEndpoints.Products.DeleteReview)]
        public async Task<IActionResult> DeleteReview([FromRoute(Name = "ReviewId")] Guid ReviewId)
        {

        }
    }
}
