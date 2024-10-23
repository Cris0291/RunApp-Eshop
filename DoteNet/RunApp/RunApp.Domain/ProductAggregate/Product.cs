using RunApp.Domain.ProductAggregate.ValueType;
using ErrorOr;
using RunApp.Domain.ProductAggregate.ProductErrors;
using System.Runtime.CompilerServices;
using RunApp.Domain.ProductAggregate.ValueTypes;
using RunApp.Domain.Common;
using RunApp.Domain.ProductAggregate.Events;
using RunApp.Domain.ReviewAggregate;
using RunApp.Domain.ProductAggregate.Tags;


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
        }
        private int _totalRatings;
        public List<Guid> Reviews { get; internal set; }
        public List<Guid> Ratings { get; internal set; }
        public List<Guid> Statuses { get; internal set; }
        public Guid ProductId { get; internal set; }
        public string Name { get;  internal set; }
        public decimal ActualPrice { get; internal set; }
        public string Description { get; internal set; }
        public int? NumberOfReviews { get; internal set; }
        public double AverageRatings { get; internal set; }
        public PriceOffer? PriceOffer { get; internal set; }
        public Characteristics Characteristic { get; internal set; }
        public ICollection<About> BulletPoints { get; internal set; }
        public ICollection<Tag> Tags { get; internal set; }


        public static ErrorOr<Product> CreateProduct(string name, string description, decimal price, ICollection<string> bulletpoints, decimal? priceWithDiscount, string? promotionalText, string brand, string type, string color, double weight, Guid storeProfileId)
        {
            decimal maximumDiscount = 0.7m;
            AddValidation(nameof(ProductError.DiscountPricesMustBeMaximum70Percent), () => priceWithDiscount < price - (price * maximumDiscount));
            AddValidation(nameof(ProductError.BulletPointsCollectionShoulNotBeEmpty), () => !bulletpoints.Any());
            AddValidation(nameof(ProductError.ActualPriceCannotBeLowerThanPriceWithDiscount),() => priceWithDiscount.HasValue && price < priceWithDiscount.Value);
            AddValidation(nameof(ProductError.AllPricesWithDiscountMustHaveAPromotionalText), () => priceWithDiscount != null && string.IsNullOrEmpty(promotionalText));
            AddValidation(nameof(ProductError.ProductWeightCannotBeGreaterThan200Kilograms), () => weight > 200);
            Validate();
            if (HasError()) return Errors;

            PriceOffer? priceOffer = null;

            if (priceWithDiscount != null && promotionalText != null) priceOffer = new PriceOffer { PriceWithDiscount = priceWithDiscount.Value, PromotionalText = promotionalText };


            var result =  new Product
            {
                Name = name,
                ActualPrice = price,
                Description = description,
                BulletPoints = bulletpoints.Select(point => new About() { BulletPoint = point }).ToList(),
                PriceOffer = priceOffer,
                Characteristic = new Characteristics() { Brand = brand, Type = type, Color = color, Weight = weight},
                Reviews = new(),
                Ratings = new(),
                Statuses = new(),
            };

            result.RaiseEvent(new CreateStockEvent(result, storeProfileId));
            return result;
        }

        public ErrorOr<Success> UpdateProduct(string name, string description, decimal price, ICollection<string> bulletpoints, string brand, string type, string color, double weight)
        {
            decimal maximumDiscount = 0.7m;
            AddValidation(nameof(ProductError.BulletPointsCollectionShoulNotBeEmpty), () =>!bulletpoints.Any());
            AddValidation(nameof(ProductError.ActualPriceCannotBeLowerThanPriceWithDiscount), () => PriceOffer != null && PriceOffer.PriceWithDiscount.HasValue && price < PriceOffer.PriceWithDiscount.Value);
            AddValidation(nameof(ProductError.DiscountPricesMustBeMaximum70Percent), () => PriceOffer != null && PriceOffer.PriceWithDiscount.HasValue && PriceOffer.PriceWithDiscount.Value < price - (price * maximumDiscount));
            AddValidation(nameof(ProductError.ProductWeightCannotBeGreaterThan200Kilograms), () => weight > 200);
            Validate();
            if (HasError()) return Errors;

            Name = name;
            ActualPrice = price;
            Description = description;
            BulletPoints = bulletpoints.Select(point => new About() { BulletPoint = point }).ToList();
            Characteristic = new Characteristics() { Brand = brand, Type = type, Color = color, Weight = weight };

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

        public ErrorOr<Success> AddPriceWithDiscount(decimal priceWithDiscount, string promotionalText)
        {
            decimal maximumDiscount = 0.7m;
            AddValidation(nameof(ProductError.DiscountPricesMustBeMaximum70Percent),() => priceWithDiscount < ActualPrice - (ActualPrice * maximumDiscount));
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
        public void AddReview(Guid reviewId)
        {
            if (Reviews.Contains(reviewId)) throw new InvalidOperationException("Cannot add more than one review per user");
            Reviews.Add(reviewId);

            NumberOfReviews = Reviews.Count();
        }
        public void DeleteReview(Guid reviewId)
        {
            var wasRemoved = Reviews.Remove(reviewId);
            NumberOfReviews = Reviews.Count();
            if (!wasRemoved) throw new InvalidOperationException("Review was not removerd");
        }
        public void AddProductStatus(Guid productStatusId)
        {
            if(Statuses.Contains(productStatusId)) throw new InvalidOperationException("Cannot add more than one like or dislike per user");

            Statuses.Add(productStatusId);
        }
        public void AddRating(Guid raitingId, int rating)
        {
            if (Ratings.Contains(raitingId)) throw new InvalidOperationException("Cannot rate twice a product");
            Ratings.Add(raitingId);

            _totalRatings += rating;
            AverageRatings = _totalRatings / Ratings.Count();
        }
        public ErrorOr<Tag> AddTag(string tag)
        {
            if (!Tag.validTags.Contains(tag)) return Error.Validation(code: "TagWasNotValid", description: "Tag was not valid");
            if (Tags.Where(x => x.TagName == tag).Count() > 0) return Error.Validation(code: "TagWasAlreadyAdded", description: "Cannot add the same tag more than one time");

            var tagToAdd = new Tag { TagName = tag };
            Tags.Add(tagToAdd);
            return tagToAdd;
        }
        public ErrorOr<Tag> DeleteTag(Guid tagId)
        {
            if (Tags.Count == 0) return Error.NotFound(code: "TagWsNotFound", description: "Tag was not found");
            if (Tags.Count > 1) throw new InvalidOperationException("Cannot repeat tags");

            return Tags.First();
        }
    }
}
