using Contracts.Reviews.Requests;
using RunApp.Domain.ReviewAggregate.ReviewEnum;
using RunnApp.Application.Reviews.Commands.CreateReview;

namespace RunApp.Api.Mappers.Reviews
{
    public static class ReviewMapper
    {
        public static CreateReviewCommand ReviewRequestToReviewCommand(this AddReviewRequest reviewRequest, Guid productId, ReviewDescriptionEnums reviewEnum, Guid userId)
        {
            return new CreateReviewCommand(productId, userId, reviewRequest.comment, reviewEnum);
        }
    }
}
