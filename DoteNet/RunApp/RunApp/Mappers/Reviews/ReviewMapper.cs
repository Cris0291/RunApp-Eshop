using Contracts.Reviews.Requests;
using Contracts.Reviews.Responses;
using RunApp.Domain.ReviewAggregate;
using RunApp.Domain.ReviewAggregate.ReviewEnum;
using RunnApp.Application.Reviews.Commands.CreateReview;

namespace RunApp.Api.Mappers.Reviews
{
    public static class ReviewMapper
    {
        public static CreateReviewCommand ReviewRequestToReviewCommand(this AddReviewRequest reviewRequest, Guid productId, ReviewDescriptionEnums reviewEnum, Guid userId)
        {
            return new CreateReviewCommand(productId, userId, reviewRequest.Comment, reviewRequest.Rating, reviewEnum);
        }
        public static ReviewResponse ReviewToReviewResponse(this Review review)
        {
            return new ReviewResponse(review.Comment, review.Rating, review.Date, review.ReviewDescription.Name);
        }
    }
}
