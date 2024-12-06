using RunApp.Domain.ReviewAggregate;
using RunnApp.Application.CustomerProfiles.Common;
using RunnApp.Application.Products.Queries.GetProducts;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserReviews
{
    public static class ReviewDtoFactory
    {
        public static List<ReviewDto> CreateReviewDtoList(this List<Review> reviews, List<ProductDto> products)
        {
            var producstDictionary = products.ToDictionary(x => x.ProductId);

           return reviews.Select(review =>
            {
                return review.ProductId.HasValue ?
                producstDictionary.ContainsKey(review.ProductId.Value) ?
                new ReviewDto(review.ReviewId, review.Comment, review.Rating, review.Date, review.ReviewDescription.Name, producstDictionary[review.ProductId.Value]) :
                throw new InvalidOperationException("A product for the corresponding review could not be found"):
                new ReviewDto(review.ReviewId, review.Comment, review.Rating, review.Date, review.ReviewDescription.Name, null);
            }).ToList();
        }
        public static IQueryable<ProductImageDto> FromProductsToProductsWithImage(this IQueryable<ProductWithMainImage> products)
        {
            return products.Select(x => new ProductImageDto(x.Product.ProductId, x.Product.Name, x.MainImage == null ? null : x.MainImage.Url));
        }
    }
}
