using RunApp.Domain.ProductAggregate.Reviews;
using RunApp.Domain.ProductAggregate.AboutValueType;
using RunApp.Domain.ProductAggregate.Reviews.ReviewErrors;
using ErrorOr;
using RunApp.Domain.ProductAggregate.ProductErrors;

namespace RunApp.Domain.Products
{
    public class Product
    {
        private Product() { }
        public string Name { get; private set; }
        public decimal? PriceWithDiscount { get; private set; }
        public decimal ActualPrice { get; private set; }
        public string Description { get; private set; }
        public string? PromotionalText { get; private set; }
        public int? Discount { get; private set; }

        //This is a value type that belongs to the root aggregate and should be map to ownsmany in entity framework
        public ICollection<About> BulletPoints { get; private set; }

        private HashSet<Review> _reviews = new();
        public IReadOnlyCollection<Review> Reviews => _reviews?.ToList();

        public static ErrorOr<Product> CreateProduct(string name, decimal price, string description, ICollection<About> bulletpoints)
        {
            if (string.IsNullOrEmpty(name)) return ProductError.AllProductsMustHaveAName;
            if (!bulletpoints.Any())
            {
                return ProductError.BulletPointsCollectionShoulNotBeEmpty;
            }

            return new Product
            {
                Name = name,
                ActualPrice = price,
                Description = description,
                BulletPoints = bulletpoints
            };
           

        }
        public ErrorOr<Success> AddReview(string comment, double numStars)
        {
            double minNumOfStars = 1.0;
            //This should be validated in the presentation/application layer as a model validation and not as an invariant
            if (string.IsNullOrEmpty(comment)) return ReviewError.AllReviewsMustHaveAComment;

            if(numStars < minNumOfStars)
            {
                return ReviewError.MinimumNunberOfStarsCannotBeLessThanOne;
            }

            _reviews.Add(new Review { Comment = comment, NumOfStars = numStars});
            return Result.Success;
        }

        public ErrorOr<Success> DeleteReview(Guid ReviewId)
        {
            Review review = _reviews.SingleOrDefault(x => x.ReviewId == ReviewId);
            if(review == null)
            {
                throw new InvalidOperationException("Review wasn't found");
            }

            return Result.Success;
        }

        public ErrorOr<Success> AddPriceWithDiscount(decimal priceWithDiscount, string promotionalText)
        {
            decimal maximumDiscount = 0.7m;
            if (priceWithDiscount < ActualPrice * maximumDiscount) return ProductError.DiscountPricesMustBeMaximum70Percent;
            if (string.IsNullOrEmpty(promotionalText)) return ProductError.AllPricesWithDiscountMustHaveAPromotionalText;

            PriceWithDiscount = priceWithDiscount;
            PromotionalText = promotionalText;

            return Result.Success;
        }

        public ErrorOr<Success> RemovePriceWithDiscount()
        {
            PriceWithDiscount = null;
            PromotionalText = null;

            return Result.Success
        }
    }
}
