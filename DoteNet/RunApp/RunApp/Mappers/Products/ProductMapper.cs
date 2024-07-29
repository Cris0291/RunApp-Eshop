using Contracts.Products.Requests;
using Contracts.Products.Responses;
using RunApp.Domain.Products;
using RunnApp.Application.Products.Commands.CreateProduct;
using RunnApp.Application.Products.Commands.UpdateProduct;

namespace RunApp.Api.Mappers.Products
{
    public static class ProductMapper
    {
        public static ProductResponse ProductToProductResponse(this Product product)
        {
            IEnumerable<string> bulletpoints = product.BulletPoints.Select(bulletpoint => bulletpoint.BulletPoint);
            return new ProductResponse(product.ProductId, product.Name, product.Description, product.ActualPrice, bulletpoints, product.PriceWithDiscount, product.PromotionalText, product.Discount);
        }

        public static ProductsResponse AllProductsToProductsResponse(this IEnumerable<Product> products)
        {
            IEnumerable<ProductResponse> responses = products.Select(product => product.ProductToProductResponse()).ToList();
            return new ProductsResponse(responses);
        }

        public static ICollection<string> BulletPointsToStrings(this IEnumerable<BulletPoint> bulletpoints)
        {
           return bulletpoints.Select(bulletpoint => bulletpoint.Point).ToList();
        }
        public static CreateProductCommand ProductRequestToProductCommand(this CreateProductRequest createProduct)
        {
            return new CreateProductCommand(createProduct.Name, createProduct.Description,
                createProduct.Price, createProduct.Bulletpoints,
                createProduct.PriceWithDiscount, createProduct.PromotionalText);
        }

        public static UpdateProductCommand UpdateProductRequestToUpdateProdcutCommand(this UpdateProductRequest updateProduct, Guid ProductId)
        {
            return new UpdateProductCommand(ProductId, updateProduct.Name, updateProduct.Description,updateProduct.Price, updateProduct.Bulletpoints, updateProduct.PriceWithDiscount, updateProduct.PromotionalText);
        }
    }
}
