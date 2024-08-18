using Contracts.Reviews.Requests;
using RunnApp.Application.Reviews.Commands.CreateReview;
using RunApp.Domain.ProductAggregate.Reviews.Common;

namespace RunApp.Api.Mappers.Reviews
{
    public static class ReviewMapper
    {
        public static CreateReviewCommand ReviewRequestToReviewCommand(this AddReviewRequest reviewRequest, Guid ProductId, ReviewDescriptionEnums reviewEnum, Guid userId)
        {
            return new CreateReviewCommand(ProductId, userId, reviewRequest.comment, reviewRequest.numOfStars, reviewEnum);
        }
    }
}
