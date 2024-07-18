using RunApp.Domain.ProductAggregate.Reviews;
using RunApp.Domain.ProductAggregate.AboutValueType;
using RunApp.Domain.ProductAggregate.Reviews.ReviewErrors;
using ErrorOr;
using RunApp.Domain.ProductAggregate.ProductErrors;
using System.Collections.Immutable;

namespace RunApp.Domain.Products
{
    public class Product
    {
        private Product() { }
        public Guid ProductId { get; private set; }
        public string Name { get; private set; }
        public decimal PriceWithDiscount { get; private set; } = 0m;
        public decimal ActualPrice { get; private set; }
        public string Description { get; private set; }
        public string? PromotionalText { get; private set; }
        public double? Discount { get; private set; }

        //This is a value type that belongs to the root aggregate and should be map to ownsmany in entity framework
        public ICollection<About> BulletPoints { get; private set; }

        private HashSet<Review> _reviews = new();
        public IReadOnlyCollection<Review> Reviews => _reviews?.ToList();
        public static List<Error> Errors { get; private set; } = new();

        public static ErrorOr<Product> CreateProduct(string name, string description, decimal price, ICollection<string> bulletpoints, decimal priceWithDiscount, string? promotionalText)
        {
            if (string.IsNullOrEmpty(name)) AddError(ProductError.AllProductsMustHaveAName);
            if (string.IsNullOrEmpty(description)) AddError(ProductError.AllProductsMustHaveADescription);
            if (!bulletpoints.Any()) AddError(ProductError.BulletPointsCollectionShoulNotBeEmpty);
            if (Errors.Any()) return CreateErrorListCopy();

            

            return new Product
            {
                Name = name,
                ActualPrice = price,
                Description = description,
                BulletPoints = bulletpoints.Select(point => new About() { BulletPoint = point }).ToList(),
                PriceWithDiscount =priceWithDiscount,
                PromotionalText = promotionalText,
            };
           

        }

        public ErrorOr<Success> UpdateProduct(string name, string description, decimal price, ICollection<string> bulletpoints)
        {
            if (string.IsNullOrEmpty(name)) AddError(ProductError.AllProductsMustHaveAName);
            if (string.IsNullOrEmpty(description)) AddError(ProductError.AllProductsMustHaveADescription);
            if (!bulletpoints.Any()) AddError(ProductError.BulletPointsCollectionShoulNotBeEmpty);
            if (Errors.Any()) return CreateErrorListCopy();

            Name = name;
            ActualPrice = price;
            Description = description;
            BulletPoints = bulletpoints.Select(point => new About() { BulletPoint = point }).ToList();
            
            return Result.Success;
        }

        public ErrorOr<Success> AddBulletPoints(IEnumerable<string> points)
        {
            if (!points.Any())
            {
                AddError(ProductError.BulletPointsCollectionShoulNotBeEmpty);
                return CreateErrorListCopy();
            }
            foreach(string point in points)
            {
                BulletPoints.Add(new About() {BulletPoint = point});
            }

            return Result.Success;
        }
        public ErrorOr<Success> AddReview(string comment, double numStars)
        {
            double minNumOfStars = 1.0;
            //This should be validated in the presentation/application layer as a model validation and not as an invariant
            if (string.IsNullOrEmpty(comment)) AddError(ReviewError.AllReviewsMustHaveAComment);
            if(numStars < minNumOfStars) AddError(ReviewError.MinimumNunberOfStarsCannotBeLessThanOne);
            if (Errors.Any()) return CreateErrorListCopy();


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
            if (priceWithDiscount < ActualPrice - (ActualPrice * maximumDiscount)) AddError(ProductError.DiscountPricesMustBeMaximum70Percent);
            if (string.IsNullOrEmpty(promotionalText)) AddError(ProductError.AllPricesWithDiscountMustHaveAPromotionalText);
            if (Errors.Any()) return CreateErrorListCopy();


            PriceWithDiscount = priceWithDiscount;
            PromotionalText = promotionalText;

            return Result.Success;
        }

        public ErrorOr<Success> RemovePriceWithDiscount()
        {
            PriceWithDiscount = 0m;
            PromotionalText = null;

            return Result.Success;
        }

        private static void AddError(Error error)
        {
            Errors.Add(error);
        }

        private static List<Error> CreateErrorListCopy()
        {
            List<Error> listOfErrors = Errors.ToList();
            Errors.Clear();
            return listOfErrors;
        }
    }
}
