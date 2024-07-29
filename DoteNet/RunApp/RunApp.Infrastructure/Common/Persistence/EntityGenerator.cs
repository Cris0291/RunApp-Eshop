using Bogus;
using RunApp.Domain.ProductAggregate.Reviews;
using RunApp.Domain.Products;
using RunApp.Domain.ProductAggregate.Reviews.Common;
using RunApp.Domain.ProductAggregate.AboutValueType;

namespace RunApp.Infrastructure.Common.Persistence
{
    public class EntityGenerator :IEntityGenerator
    {
        public (List<Product>, List<Review>) GenerateProductsAndReviewsWithForeignKeys()
        {
            List<Product> products = Generateproduct();
            List<Review> reviews = GenerateReview();

            for(int i = 0; i< products.Count; i++)
            {
                reviews[i].ProductId = products[i].ProductId;
            }
            return (products, reviews);
        }
        public List<Product> Generateproduct()
        {
            var fakeProducts = new Faker<Product>()
               .RuleFor(p => p.ProductId, Guid.NewGuid())
               .RuleFor(p => p.Name, f => f.Commerce.ProductName())
               .RuleFor(p => p.PriceWithDiscount, f => f.Random.Decimal(50, 100))
               .RuleFor(p => p.ActualPrice, f => f.Random.Decimal(200, 1000))
               .RuleFor(p => p.Description, f => f.Lorem.Paragraph())
               .RuleFor(p => p.PromotionalText, f => f.Lorem.Sentence());
                

            return fakeProducts.Generate(10);
        }

        public  List<Review> GenerateReview()
        {
            var fakeReviews =  new Faker<Review>()
                .RuleFor(r => r.ReviewId, f => Guid.NewGuid())
                .RuleFor(r => r.Comment, f => f.Lorem.Sentence())
                .RuleFor(r => r.NumOfStars, f => f.Random.Double(1, 5))
                .RuleFor(r => r.Date, f => f.Date.Past(2, new DateTime(2010, 10, 25)))
                .RuleFor(r => r.ProductId, from => Guid.Empty);

           return fakeReviews.Generate(10);
        }

        public  List<About> GenerateBulletPoint()
        {
            var fakeBuleltpoints = new Faker<About>()
                .RuleFor(a => a.BulletPoint, f => f.Lorem.Sentence());

            return fakeBuleltpoints.Generate(10);
        }
    }
}
