using RunApp.Domain.ProductAggregate.AboutValueType;
using RunApp.Domain.ProductAggregate.Reviews;
using RunApp.Domain.Products;

namespace RunApp.Infrastructure.Common.Persistence
{
    public interface IEntityGenerator
    {
        (List<Product>, List<Review>) GenerateProductsAndReviewsWithForeignKeys();
        List<Product> Generateproduct();
        List<Review> GenerateReview();
        List<About> GenerateBulletPoint();
    }
}