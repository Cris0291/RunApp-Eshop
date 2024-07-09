using ErrorOr;

namespace RunApp.Domain.ProductAggregate.Reviews.ReviewErrors
{
    public static class ReviewError
    {
        public static Error MinimumNunberOfStarsCannotBeLessThanOne = Error.Validation(code: "MinimumNunberOfStarsCannotBeLessThanOne", description: "The number of stars cannot be inferior to 1.0");
        public static Error AllReviewsMustHaveAComment = Error.Validation(code: "AllReviewsMustHaveAComment", description:"Reviews must have a comment");
    }
}
