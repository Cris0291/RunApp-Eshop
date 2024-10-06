using RunApp.Domain.RatingAggregate;
using RunApp.Domain.ReviewAggregate;

namespace RunnApp.Application.Products.Queries.GetProduct
{
    public static class ReviewsWithRatingBuilder
    {
        public static IEnumerable<ReviewDto> MatchReviewsWithRatings(this List<Review> reviews, List<Rating> ratings)
        {
            var ratingsHashMap = ratings.GenerateHashMap();

            return reviews.Select(review =>
            {
                if (ratingsHashMap.ContainsKey(review.Id)) return review.CreateReviewDto(ratingsHashMap[review.Id]);

                return review.CreateReviewDto(null);
            });
        }
        private static Dictionary<Guid, (int, DateTime)> GenerateHashMap(this List<Rating> ratings)
        {
            var dictionary = new Dictionary<Guid, (int, DateTime)>();

            foreach (var rating in ratings)
            {
                dictionary[rating.Id] = (rating.NumOfStars, rating.DateOfRate);
            }

            return dictionary;
        }

        private static ReviewDto CreateReviewDto(this Review review, (int NumOfStars, DateTime DateOfRate)? ratingTuple)
        {
            var ratingDto = new RatingDto(ratingTuple.Value.NumOfStars, ratingTuple.Value.DateOfRate);
            return new ReviewDto(review.Comment, review.Date, review.ReviewDescription.Name, ratingDto);
        }
    }
}
