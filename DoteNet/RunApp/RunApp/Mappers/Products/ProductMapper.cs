using Contracts.Products.Requests;
using Contracts.Products.Responses;
using Contracts.Rates.Response;
using Contracts.Reviews.Responses;
using RunApp.Domain.Products;
using RunnApp.Application.Products.Commands.CreateProduct;
using RunnApp.Application.Products.Commands.UpdateProduct;
using RunnApp.Application.Products.Queries.GetProduct;
using RunnApp.Application.Products.Queries.GetProducts;

namespace RunApp.Api.Mappers.Products
{
    public static class ProductMapper
    {
        public static ProductResponse ProductToProductResponse(this Product product)
        {
            IEnumerable<string> bulletpoints = product.BulletPoints.Select(bulletpoint => bulletpoint.BulletPoint);
            return new ProductResponse(product.ProductId, product.Name, product.Description, product.ActualPrice, bulletpoints, product.PriceOffer != null ? product.PriceOffer.PriceWithDiscount : null, product.PriceOffer != null ? product.PriceOffer.PromotionalText : null, product.PriceOffer != null ? product.PriceOffer.Discount : null);
        }
        public static IEnumerable<ProductForCard> AllProductsToProductsResponse(this IEnumerable<ProductsJoin> productsJoin)
        {
            IEnumerable<ProductForCard> responses = productsJoin.Select(productJoin =>
            {
                if(productJoin.ProductStatus == null)
                {
                    productJoin.Product.UserLike = null;
                }
                else
                {
                    productJoin.Product.UserLike = productJoin.ProductStatus.Like;
                }
                return productJoin.Product;
            }).ToList();
            return responses;
        }

        public static CreateProductCommand ProductRequestToProductCommand(this CreateProductRequest createProduct, Guid storeProfileId)
        {
            return new CreateProductCommand(createProduct.Name, createProduct.Description,
                createProduct.Price, createProduct.Bulletpoints,
                createProduct.PriceWithDiscount, createProduct.PromotionalText, createProduct.Characteristics.Brand, 
                createProduct.Characteristics.Type, createProduct.Characteristics.Color, createProduct.Characteristics.Weight, storeProfileId, createProduct.Tags);
        }
        public static UpdateProductCommand ProductRequestToProductCommand(this UpdateProductRequest updateProduct, Guid productId)
        {
            return new UpdateProductCommand(updateProduct.Name, updateProduct.Description,
                updateProduct.Price, updateProduct.Bulletpoints,updateProduct.Characteristics.Brand,
                updateProduct.Characteristics.Type, updateProduct.Characteristics.Color, updateProduct.Characteristics.Weight, productId);
        }
        public static IEnumerable<UserBoughtProductsResponse> ProductsWithImageToProductsResponse(this IEnumerable<ProductWithMainImage> productWithMainImages)
        {
            return productWithMainImages.Select(x => x.ProductWithImageToProductResponse()).ToList();
        }
        public static UserBoughtProductsResponse ProductWithImageToProductResponse(this ProductWithMainImage productWithMainImage)
        {
            return new UserBoughtProductsResponse(productWithMainImage.Product.ProductId, productWithMainImage.MainImage.Url, productWithMainImage.Product.ActualPrice, productWithMainImage.Product.Name);
        }
    }
}
