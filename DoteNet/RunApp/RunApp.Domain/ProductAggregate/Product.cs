using RunApp.Domain.ProductAggregate.Reviews;
using RunApp.Domain.ProductAggregate.ValueType;
using RunApp.Domain.ProductAggregate.Reviews.ReviewErrors;
using ErrorOr;
using RunApp.Domain.ProductAggregate.ProductErrors;
using RunApp.Domain.ProductAggregate.Reviews.Common;
using System.Runtime.CompilerServices;
using RunApp.Domain.ProductAggregate.ValueTypes;
using RunApp.Domain.CustomerProfileAggregate.ProductStatuses;
using RunApp.Domain.Common;

[assembly: InternalsVisibleTo("TestsUtilities")]
namespace RunApp.Domain.Products
{
    public class Product : Entity
    {
       
        internal Product() { }
         // Constructor use for unit testing
        internal Product(Guid productId, string name, decimal actualPrice, string description, PriceOffer priceOffer, ICollection<About> bulletpoints, List<Review> reviews)
        {
            ProductId = productId;
            Name = name;
            ActualPrice = actualPrice;
            Description = description;
            PriceOffer = priceOffer;
            BulletPoints = bulletpoints;
            Reviews = reviews;
        }
        public Guid ProductId { get; internal set; }
        public string Name { get;  internal set; }
        public decimal ActualPrice { get; internal set; }
        public string Description { get; internal set; }
        public PriceOffer PriceOffer { get; internal set; }
        public ICollection<About> BulletPoints { get; internal set; }

        public List<Review> Reviews { get; internal set; } 

        public static ErrorOr<Product> CreateProduct(string name, string description, decimal price, ICollection<string> bulletpoints, decimal? priceWithDiscount, string? promotionalText)
        {
            decimal maximumDiscount = 0.7m;
            AddValidation(nameof(ProductError.DiscountPricesMustBeMaximum70Percent), () => priceWithDiscount < price - (price * maximumDiscount));
            AddValidation(nameof(ProductError.AllProductsMustHaveAName), () => string.IsNullOrEmpty(name));
            AddValidation(nameof(ProductError.AllProductsMustHaveADescription), () => string.IsNullOrEmpty(description));
            AddValidation(nameof(ProductError.BulletPointsCollectionShoulNotBeEmpty), () => !bulletpoints.Any());
            AddValidation(nameof(ProductError.ActualPriceCannotBeLowerThanPriceWithDiscount),() => priceWithDiscount.HasValue && price < priceWithDiscount.Value);
            AddValidation(nameof(ProductError.AllPricesWithDiscountMustHaveAPromotionalText), () => priceWithDiscount != null && string.IsNullOrEmpty(promotionalText));
            Validate();
            if (HasError()) return Errors;


            return new Product
            {
                Name = name,
                ActualPrice = price,
                Description = description,
                BulletPoints = bulletpoints.Select(point => new About() { BulletPoint = point }).ToList(),
                PriceOffer = new PriceOffer {PriceWithDiscount = priceWithDiscount.Value, PromotionalText = promotionalText }
            };
           

        }

        public ErrorOr<Success> UpdateProduct(string name, string description, decimal price, ICollection<string> bulletpoints)
        {
            AddValidation(nameof(ProductError.AllProductsMustHaveAName), () => string.IsNullOrEmpty(name));
            AddValidation(nameof(ProductError.AllProductsMustHaveADescription),() => string.IsNullOrEmpty(description));
            AddValidation(nameof(ProductError.BulletPointsCollectionShoulNotBeEmpty), () =>!bulletpoints.Any());
            AddValidation(nameof(ProductError.ActualPriceCannotBeLowerThanPriceWithDiscount), () => PriceOffer.PriceWithDiscount.HasValue && price < PriceOffer.PriceWithDiscount.Value);
            Validate();
            if (HasError()) return Errors;

            Name = name;
            ActualPrice = price;
            Description = description;
            BulletPoints = bulletpoints.Select(point => new About() { BulletPoint = point }).ToList();

            return Result.Success;
        }

        public ErrorOr<Success> AddBulletPoints(IEnumerable<string> points)
        {
            AddValidation(nameof(ProductError.BulletPointsCollectionShoulNotBeEmpty), () => !points.Any());
            Validate();
            if (HasError()) return Errors;

            foreach (string point in points)
            {
                BulletPoints.Add(new About() {BulletPoint = point});
            }

            return Result.Success;
        }
        public ErrorOr<Review> AddReview(string comment, double numStars,ReviewDescriptionEnums reviewEnum, Guid productId, Guid userId)
        {
            double minNumOfStars = 1.0;
            AddValidation(nameof(ReviewError.AllReviewsMustHaveAComment), () => string.IsNullOrEmpty(comment));
            AddValidation(nameof(ReviewError.MinimumNunberOfStarsCannotBeLessThanOne),()=>numStars < minNumOfStars);
            Validate();
            if (HasError()) return Errors;

            Review newReview = new Review { Comment = comment, NumOfStars = numStars, ReviewDescription = reviewEnum, ProductId = productId, Id = userId };
            Reviews.Add(newReview);
            return newReview;
        }

        public ErrorOr<Success> DeleteReview(Guid userId, Guid productId)
        {
            Review? review = Reviews.SingleOrDefault(x => x.Id == userId && x.ProductId == productId);
            if (review == null) return Error.NotFound(code: "ReviewWasNOtFound", description: "Review was not found with given id");

            Reviews.Remove(review);

            return Result.Success;
        }

        public ErrorOr<Success> AddPriceWithDiscount(decimal priceWithDiscount, string promotionalText)
        {
            decimal maximumDiscount = 0.7m;
            AddValidation(nameof(ProductError.DiscountPricesMustBeMaximum70Percent),() =>priceWithDiscount < ActualPrice - (ActualPrice * maximumDiscount));
            AddValidation(nameof(ProductError.AllPricesWithDiscountMustHaveAPromotionalText), () =>string.IsNullOrEmpty(promotionalText));
            AddValidation(nameof(ProductError.ActualPriceCannotBeLowerThanPriceWithDiscount), () => ActualPrice < priceWithDiscount);
            Validate();
            if (HasError()) return Errors;


            PriceOffer = new PriceOffer { PriceWithDiscount = priceWithDiscount, PromotionalText = promotionalText };
          

            return Result.Success;
        }

        public void RemovePriceWithDiscount()
        {
            PriceOffer = null;
            
        }
    }
}
