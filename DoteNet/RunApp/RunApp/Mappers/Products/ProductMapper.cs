using Contracts.Products.Requests;
using Contracts.Products.Responses;
using RunApp.Domain.Products;

namespace RunApp.Api.Mappers.Products
{
    public static class ProductMapper
    {
        public static ProductResponse ProductToProductResponse(this Product product)
        {
            IEnumerable<string> bulletpoints = product.BulletPoints.Select(bulletpoint => bulletpoint.BulletPoint);
            return new ProductResponse(product.ProductId, product.Name, product.Description, product.ActualPrice, bulletpoints, product.PriceWithDiscount, product.PromotionalText);
        }

        public static ProductsResponse AllProductsToProductsResponse(this IEnumerable<Product> products)
        {
            IEnumerable<ProductResponse> responses = products.Select(product => product.ProductToProductResponse()).ToList();
            return new ProductsResponse(responses);
        }

        public static IEnumerable<string> BulletPointsToStrings(this IEnumerable<BulletPoint> bulletpoints)
        {
           return bulletpoints.Select(bulletpoint => bulletpoint.Point).ToList();
        }
    }
}
