using RunApp.Domain.PhotoAggregate;
using RunApp.Domain.Products;
using RunApp.Domain.ReviewAggregate;

namespace RunnApp.Application.Products.Queries.GetProduct
{
    public static class ProductItemBuilder
    {
        public static ProductItemDto CreateProductItemDto(this Product product, IEnumerable<Photo> photos, IEnumerable<Review> reviews)
        {
            return new ProductItemDto
            {
                Name = product.Name,
                ProductId = product.ProductId,
                ActualPrice = product.ActualPrice,
                Description = product.Description,
                NumberOfReviews = product.NumberOfReviews,
                NumberOflikes = product.NumberOfLikes,
                AverageRatings = product.AverageRatings,
                PriceWithDiscount = product.PriceOffer?.PriceWithDiscount,
                Discount = product.PriceOffer?.Discount,
                PromotionalText = product.PriceOffer?.PromotionalText,
                Images = photos.Select(x => x.Url).ToList(),
                CategoryNames = product.Categories.Select(x => x.CategoryName).ToList(),
                BulletPoints = product.BulletPoints.Select(x => x.BulletPoint).ToList(),
                Reviews = reviews.Select(x => x.CreateReviewDto())
            };
        }
        public static ReviewDto CreateReviewDto(this Review review)
        {
            return new ReviewDto(review.Comment, review.Date, review.ReviewDescription.Name, review.Rating);
        }
    }
}
