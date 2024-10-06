using Contracts.Products.Requests;
using Contracts.Products.Responses;
using Contracts.ProductStatuses.Response;
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
            return new ProductResponse(product.ProductId, product.Name, product.Description, product.ActualPrice, bulletpoints, product.PriceOffer.PriceWithDiscount, product.PriceOffer.PromotionalText, product.PriceOffer.Discount);
        }
        public static ProductWithReviewsResponse ProductWithReviewToProductWithReviewsResponse(this ProductWithReviews productWIthReviews)
        {
            IEnumerable<string> bulletpoints = productWIthReviews.Product.BulletPoints.Select(bulletpoint => bulletpoint.BulletPoint);
            return new ProductWithReviewsResponse(productWIthReviews.Product.ProductId, productWIthReviews.Product.Name, productWIthReviews.Product.Description, 
                productWIthReviews.Product.ActualPrice, bulletpoints, productWIthReviews.Product.PriceOffer.PriceWithDiscount, 
                productWIthReviews.Product.PriceOffer.PromotionalText, productWIthReviews.Product.PriceOffer.Discount, productWIthReviews.Product.NumberOfReviews.Value, productWIthReviews.Product.AverageRatings.Value ,productWIthReviews.Reviews.ReviewsToReviewResponses());
        }
        public static ReviewResponse ReviewToReviewResponse(this ReviewDto review)
        {
            var ratingResponse = new RatingResponse(review.RatingDto.NumOfStars, review.RatingDto.DateOfRate);
            return new ReviewResponse(review.Comment, review.Date, review.ReviewDescription, ratingResponse);
        }
        public static IEnumerable<ReviewResponse> ReviewsToReviewResponses(this IEnumerable<ReviewDto> reviews)
        {
           return reviews.Select(x => x.ReviewToReviewResponse());
        }
        public static ProductsForCardResponse AllProductsToProductsResponse(this IEnumerable<ProductForCard> products)
        {
            IEnumerable<ProductForCardResponse> responses = products.Select(product => product.ProductForCardToProductForCardResponse()).ToList();
            return new ProductsForCardResponse(responses);
        }
        public static ProductForCardResponse ProductForCardToProductForCardResponse(this ProductForCard productForCard)
        {
            var productStatusResponse = new ProductStatusResponse(productForCard.ProductStatus.Like, productForCard.ProductStatus.Dislike, productForCard.ProductStatus.Viewed, productForCard.ProductStatus.Bought);

            return new ProductForCardResponse(productForCard.ProductId, productForCard.Name, productForCard.ActualPrice, 
                                              productForCard.NumberOfReviews, productForCard.AverageRatings, productForCard.PriceWithDiscount, 
                                              productForCard.PromotionalText, productForCard.Discount, productStatusResponse);
        }

        public static CreateProductCommand ProductRequestToProductCommand(this CreateProductRequest createProduct, Guid storeProfileId)
        {
            return new CreateProductCommand(createProduct.Name, createProduct.Description,
                createProduct.Price, createProduct.Bulletpoints,
                createProduct.PriceWithDiscount, createProduct.PromotionalText, createProduct.Characteristics.Brand, 
                createProduct.Characteristics.Type, createProduct.Characteristics.Color, createProduct.Characteristics.Weight, storeProfileId);
        }
        public static UpdateProductCommand ProductRequestToProductCommand(this UpdateProductRequest updateProduct, Guid productId)
        {
            return new UpdateProductCommand(updateProduct.Name, updateProduct.Description,
                updateProduct.Price, updateProduct.Bulletpoints,updateProduct.Characteristics.Brand,
                updateProduct.Characteristics.Type, updateProduct.Characteristics.Color, updateProduct.Characteristics.Weight, productId);
        }
    }
}
