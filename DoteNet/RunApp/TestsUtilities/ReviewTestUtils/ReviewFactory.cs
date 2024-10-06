using RunApp.Domain.ReviewAggregate;
using RunApp.Domain.ReviewAggregate.ReviewEnum;

namespace TestsUtilities.ReviewTestUtils
{
    public static class ReviewFactory
    {
        public static Review CreateReview(Guid? id = null, string? comment = null, 
                                         double? numOfStars = null, DateTime? date = null, 
                                         ReviewDescriptionEnums? reviewDescription = null, Guid? productId =null)
        {
            return new Review(id ?? Constants.Review.id, comment ?? Constants.Review.Comment,
                              date ?? Constants.Review.Date,reviewDescription ?? Constants.Review.ReviewDesccription, 
                              productId ?? Constants.Review.ProductId);
        }
    }
}
