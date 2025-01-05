using RunApp.Domain.ReviewAggregate;
using RunnApp.Application.CustomerProfiles.Common;
using RunnApp.Application.Products.Queries.GetProducts;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserReviews
{
    public static class ReviewDtoFactory
    {
        public static IQueryable<ProductImageDto> FromProductsToProductsWithImage(this IQueryable<ProductWithMainImage> products)
        {
            return products.Select(x => new ProductImageDto(x.Product.ProductId, x.Product.Name, x.MainImage == null ? null : x.MainImage.Url));
        }
        public static List<ReviewWithProductImage> CreateReviewsWithProduct(this List<Review> reviews, List<ProductImageDto> products)
        {
            return reviews
                .GroupJoin(products,
                           review => review.ProductId,
                           product => product.ProductId,
                           (o, i) => new { o, i })
                .SelectMany(x => x.i.DefaultIfEmpty(),
 
                (review, product) => new ReviewWithProductImage { Review = review.o, ProductImage = product }
                ).ToList();
        }
    }
}
