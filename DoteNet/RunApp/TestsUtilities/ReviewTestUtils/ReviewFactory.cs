using RunApp.Domain.ProductAggregate.Reviews;
using RunApp.Domain.ProductAggregate.Reviews.Common;

namespace TestsUtilities.ReviewTestUtils
{
    public static class ReviewFactory
    {
        public static Review CreateReview(Guid? reviewId = null, string? comment = null, 
                                         double? numOfStars = null, DateTime? date = null, 
                                         ReviewDescriptionEnums? reviewDescription = null, Guid? productId =null)
        {
            return new Review(reviewId ?? Constants.Review.ReviewId, comment ?? Constants.Review.Comment,
                              numOfStars ?? Constants.Review.NumOfStars, date ?? Constants.Review.Date,
                              reviewDescription ?? Constants.Review.ReviewDesccription, productId ?? Constants.Review.ProductId);
        }
    }
}
