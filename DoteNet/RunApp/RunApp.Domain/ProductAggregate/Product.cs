using RunApp.Domain.ProductAggregate.Reviews;
using RunApp.Domain.ProductAggregate.AboutValueType;
using RunApp.Domain.ProductAggregate.Reviews.ReviewErrors;
using ErrorOr;
using RunApp.Domain.ProductAggregate.ProductErrors;
using System.Collections.Immutable;
using RunApp.Domain.ProductAggregate.Reviews.Common;
using System.Runtime.CompilerServices;
using System.Linq;

[assembly: InternalsVisibleTo("TestsUtilities")]
namespace RunApp.Domain.Products
{
    public class Product
    {
       
        internal Product() { }
         // Constructor use for unit testing
        internal Product(Guid productId, string name, decimal priceWithDiscount, decimal actualPrice, string description, string promotionalText, decimal discount, ICollection<About> bulletpoints, List<Review> reviews)
        {
            ProductId = productId;
            Name = name;
            PriceWithDiscount = priceWithDiscount;
            ActualPrice = actualPrice;
            Description = description;
            PromotionalText = promotionalText;
            Discount = discount;
            BulletPoints = bulletpoints;
            Reviews = reviews;
        }
        public Guid ProductId { get; internal set; }
        public string Name { get;  internal set; }
        public decimal? PriceWithDiscount { get; internal set; }
        public decimal ActualPrice { get; internal set; }
        public string Description { get; internal set; }
        public string? PromotionalText { get; internal set; }
        public decimal? Discount { get; internal set; }

        //This is a value type that belongs to the root aggregate and should be map to ownsmany in entity framework
        public ICollection<About> BulletPoints { get; internal set; }

        public List<Review> Reviews { get; internal set; } 
        public static List<Error> Errors { get; internal set; } = new();

        public static ErrorOr<Product> CreateProduct(string name, string description, decimal price, ICollection<string> bulletpoints, decimal? priceWithDiscount, string? promotionalText)
        {
            decimal maximumDiscount = 0.7m;
            if (priceWithDiscount < price - (price * maximumDiscount)) AddError(ProductError.DiscountPricesMustBeMaximum70Percent);
            if (string.IsNullOrEmpty(name)) AddError(ProductError.AllProductsMustHaveAName);
            if (string.IsNullOrEmpty(description)) AddError(ProductError.AllProductsMustHaveADescription);
            if (!bulletpoints.Any()) AddError(ProductError.BulletPointsCollectionShoulNotBeEmpty);
            if (priceWithDiscount.HasValue && price < priceWithDiscount.Value) AddError(ProductError.ActualPriceCannotBeLowerThanPriceWithDiscount);
            if (priceWithDiscount != null && string.IsNullOrEmpty(promotionalText)) AddError(ProductError.AllPricesWithDiscountMustHaveAPromotionalText);
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
            if (PriceWithDiscount.HasValue && price < PriceWithDiscount.Value) AddError(ProductError.ActualPriceCannotBeLowerThanPriceWithDiscount);
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
        public ErrorOr<Review> AddReview(string comment, double numStars,ReviewDescriptionEnums reviewEnum)
        {
            double minNumOfStars = 1.0;
            //This should be validated in the presentation/application layer as a model validation and not as an invariant
            if (string.IsNullOrEmpty(comment)) AddError(ReviewError.AllReviewsMustHaveAComment);
            if(numStars < minNumOfStars) AddError(ReviewError.MinimumNunberOfStarsCannotBeLessThanOne);
            if (Errors.Any()) return CreateErrorListCopy();

            Review newReview = new Review { Comment = comment, NumOfStars = numStars, ReviewDescription = reviewEnum };
            Reviews.Add(newReview);
            return newReview;
        }

        public ErrorOr<Success> DeleteReview(Guid ReviewId)
        {
            Review? review = Reviews.SingleOrDefault(x => x.ReviewId == ReviewId);
            if (review == null) return Error.NotFound(code: "ReviewWasNOtFound", description: "Review was not found with given id");

            Reviews.Remove(review);

            return Result.Success;
        }

        public ErrorOr<Success> AddPriceWithDiscount(decimal priceWithDiscount, string promotionalText)
        {
            decimal maximumDiscount = 0.7m;
            if (priceWithDiscount < ActualPrice - (ActualPrice * maximumDiscount)) AddError(ProductError.DiscountPricesMustBeMaximum70Percent);
            if (string.IsNullOrEmpty(promotionalText)) AddError(ProductError.AllPricesWithDiscountMustHaveAPromotionalText);
            if (ActualPrice < priceWithDiscount) AddError(ProductError.ActualPriceCannotBeLowerThanPriceWithDiscount);
            if (Errors.Any()) return CreateErrorListCopy();


            PriceWithDiscount = priceWithDiscount;
            PromotionalText = promotionalText;

            return Result.Success;
        }

        public void RemovePriceWithDiscount()
        {
            PriceWithDiscount = null;
            PromotionalText = null;
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

        public override string ToString()
        {
           var point = string.Join(",", BulletPoints.Select(b => b.BulletPoint));
           
            return $"{ProductId}, {Name}, {PriceWithDiscount}, {ActualPrice}, {Description}, {PromotionalText}, {Discount}, {point}";
        }
    }
}
