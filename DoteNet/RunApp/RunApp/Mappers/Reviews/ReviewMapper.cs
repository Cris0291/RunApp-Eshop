using Contracts.Reviews.Requests;
using RunnApp.Application.Reviews.Commands.CreateReview;

namespace RunApp.Api.Mappers.Reviews
{
    public static class ReviewMapper
    {
        public static CreateReviewCommand ReviewRequestToReviewCommand(this AddReviewRequest reviewRequest, Guid ProductId)
        {
            return new CreateReviewCommand(ProductId, reviewRequest.comment, reviewRequest.numOfStars);
        }
    }
}
