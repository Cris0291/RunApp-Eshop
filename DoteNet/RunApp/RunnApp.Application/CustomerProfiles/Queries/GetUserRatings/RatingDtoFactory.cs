using RunApp.Domain.RatingAggregate;
using RunnApp.Application.CustomerProfiles.Common;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserRatings
{
    public static class RatingDtoFactory
    {
        public static List<RatingDto> CreateRatingDto(this List<Rating> ratings, List<ProductDto> products)
        {
            var boughtProductsDictionary = products.ToDictionary(x => x.ProductId);

            return ratings.Select(x =>
            {
                return x.ProductId.HasValue ?
                boughtProductsDictionary.ContainsKey(x.ProductId.Value) ?
                 new RatingDto(x.RatingId, x.NumOfStars, x.DateOfRate, boughtProductsDictionary[x.ProductId.Value]) :
                 throw new InvalidOperationException("A product fpr the corresponding rating could not be found") :
                 new RatingDto(x.RatingId, x.NumOfStars, x.DateOfRate, null);
            }).ToList();
        }
    }
}
