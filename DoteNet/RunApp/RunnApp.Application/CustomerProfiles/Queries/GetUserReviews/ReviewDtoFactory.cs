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
    }
}
