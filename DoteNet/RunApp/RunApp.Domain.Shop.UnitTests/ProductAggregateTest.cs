using AutoFixture;
using ErrorOr;
using RunApp.Domain.Products;
using TestsUtilities.ProductTestUtils;
using TestsUtilities.ReviewTestUtils;
using FluentAssertions;
using Xunit.Abstractions;
using RunApp.Domain.ReviewAggregate;
using RunApp.Domain.ReviewAggregate.ReviewEnum;



namespace RunApp.Domain.Shop.UnitTests
{
    public class ProductAggregateTest
    {
        private readonly IFixture _fixture;
        private readonly ITestOutputHelper _testOutputHelper;

        public ProductAggregateTest(ITestOutputHelper testOutputHelper)
        {
            _fixture = new Fixture();
            _testOutputHelper = testOutputHelper;
        }

        #region Reviews
        [Fact] 
        public void AddReview_WhenNumberOfStarsIsLowerThan1_ShouldAValidationError()
        {
            //Arrange

            //Create dummy product 
            Product productToTest = CustomizeAndCreateProduct();

            //Create dummy reviews
            List<Review> reviews = Enumerable.Range(0, 3).Select(_ => CustomizaAndCreateReview(comment: "valid reviews", numOfStars: 3, reviewDescription: ReviewDescriptionEnums.Awesome)).ToList();

            //Create review to test
            Review reviewToTest = _fixture.Build<Review>()
                .FromFactory(() => ReviewFactory.CreateReview(comment: "custom test review", numOfStars: 0, reviewDescription: ReviewDescriptionEnums.BadProduct))
                .Create();
           
            reviews.Add(reviewToTest);

            //Act
            // List<ErrorOr<Review>> errorOrReviews = reviews.Select(review => productToTest.AddReview(review.Comment, review.ReviewDescription)).ToList();
            //Pending
            List<ErrorOr<Review>> errorOrReviews = default;

             //Assert
             var allButLast = errorOrReviews[..^1];
            var last = errorOrReviews[^1];

            allButLast.Should().AllSatisfy(r => r.IsError.Should().BeFalse());
            last.IsError.Should().BeTrue();
            last.Errors.First().Description.Should().Be("The number of stars cannot be inferior to 1.0");
        }
        [Fact]
        public void AddReview_WhenReviewDoesNotHaveAComment_ShouldHaveAValidationError()
        {
            //Arrange

            //Create dummy product and review
            Product productToTest = CustomizeAndCreateProduct();
            Review validReview = CustomizaAndCreateReview(comment: "valid reviews", numOfStars: 3, reviewDescription: ReviewDescriptionEnums.Awesome);

            //Create invalid review
            Review invalidReview =_fixture.Build<Review>()
                .FromFactory(() => ReviewFactory.CreateReview(comment: ""))
                .Create();

            //Act
            //ErrorOr<Review> validResult =productToTest.AddReview(validReview.Comment, validReview.ReviewDescription);
            //ErrorOr<Review> invalidResult = productToTest.AddReview(invalidReview.Comment, invalidReview.ReviewDescription);
            //Pending
            ErrorOr<Review> validResult = default;
            ErrorOr<Review> invalidResult = default;

            //Assert
            validResult.Value.Comment.Should().Be(validReview.Comment);
            invalidResult.IsError.Should().BeTrue();
            invalidResult.Errors.First().Code.Should().Be("AllReviewsMustHaveAComment");

        }
        #endregion

        #region Products

        [Fact]
        public void AddPriceWithDiscount_WhenTheDiscountIsGreaterThan70Percent_ShouldHaveAValidationError()
        {
            //Arrange

            //Create product and fake prices
            var product = CustomizeAndCreateProduct();
            decimal priceWithDiscount = 20.2m;
            string promotionalText = "fake description";

            //Act
            var errorOrProduct = product.AddPriceWithDiscount(priceWithDiscount, promotionalText);

            //Assert

            errorOrProduct.IsError.Should().BeTrue();
            errorOrProduct.Errors.First().Code.Should().Be("DiscountPricesMustBeMaximum70Percent");
        }
        [Fact]
        public void AddPriceWithDiscount_WhenActualPriceCannotBeLowerThanPriceWithDiscount_ShouldHaveAValidationError()
        {
            //Arrange

            //Create product and fake prices
            var product = CustomizeAndCreateProduct(price: 100m);
            decimal priceWithDiscount = 200.2m;
            string promotionalText = "fake description";

            //Act
            var errorOrProduct = product.AddPriceWithDiscount(priceWithDiscount, promotionalText);

            //Assert
            errorOrProduct.IsError.Should().BeTrue();
            errorOrProduct.Errors.First().Code.Should().Be("ActualPriceCannotBeLowerThanPriceWithDiscount");
        }
        [Fact]
        public void CreateProduct_WhenProductNameIsEmpty_ShouldHaveAValidationException()
        {
            //Arrange

            //Create product and fake prices
            var product = CustomizeAndCreateProduct();
            string emptyName = "";
            ICollection<string> points = product.BulletPoints.Select(P => P.BulletPoint).ToList();

            //Act
            //ErrorOr<Product> errorOrProduct =  Product.CreateProduct("", product.Description, product.ActualPrice, points,product.PriceOffer.PriceWithDiscount, product.PriceOffer.PromotionalText);
            //Pending
            ErrorOr<Product> errorOrProduct = default;

            //Assert
            errorOrProduct.IsError.Should().BeTrue();
            errorOrProduct.Errors.First().Code.Should().Be("AllProductsMustHaveAName");
            errorOrProduct.Errors.Count.Should().Be(1);
        }
        [Fact]
        public void CreateProduct_WhenProductPromotionalTextIsEmptyWhileHavingAPromotionalPrice_ShouldHaveAValidationError()
        {
            //Arrange

            //Create product and fake prices
            var product = CustomizeAndCreateProduct();
            string promotionalText = "";
            ICollection<string> points = product.BulletPoints.Select(P => P.BulletPoint).ToList();

            //Act
            //ErrorOr<Product> errorOrProduct = Product.CreateProduct(product.Name, product.Description, product.ActualPrice, points, product.PriceOffer.PriceWithDiscount, promotionalText);
            //Pending
            ErrorOr<Product> errorOrProduct = default;

            //Assert
            errorOrProduct.IsError.Should().BeTrue();
            errorOrProduct.Errors.First().Code.Should().Be("AllPricesWithDiscountMustHaveAPromotionalText");
            errorOrProduct.Errors.Count.Should().Be(1);
        }
        [Fact]
        public void CreateProduct_WhenProductDescriptionIsEmpty_ShouldHaveAValidationError()
        {
            //Arrange

            //Create product and fake prices
            var product = CustomizeAndCreateProduct();
            string description = "";
            ICollection<string> points = product.BulletPoints.Select(P => P.BulletPoint).ToList();
            //Act
            //ErrorOr<Product> errorOrProduct = Product.CreateProduct(product.Name, description, product.ActualPrice, points, product.PriceOffer.PriceWithDiscount, product.PriceOffer.PromotionalText);
            //Pending
            ErrorOr<Product> errorOrProduct = default;

            //Assert
            errorOrProduct.IsError.Should().BeTrue();
            errorOrProduct.Errors.First().Code.Should().Be("AllProductsMustHaveADescription");
            errorOrProduct.Errors.Count.Should().Be(1);
        
        }
        #endregion


        private Product CustomizeAndCreateProduct(Guid? id = null, string? name = null, string? description = null,
            decimal? price = null, ICollection<string>? bulletpoints = null,
            decimal? priceWithDiscount = null, string? promotionalText = null, decimal? discount = null, List<Review>? reviews = null)
        {
            _fixture.Customize<Product>(c => c.FromFactory(() => ProductFactory.CreateProduct(id, name, description, price, bulletpoints, priceWithDiscount, promotionalText,discount, reviews)));
            var product = _fixture.Create<Product>();
            return product;
        }

        private Review CustomizaAndCreateReview(Guid? reviewId = null, string? comment = null,
                                         double? numOfStars = null, DateTime? date = null,
                                         ReviewDescriptionEnums? reviewDescription = null, Guid? productId = null)
        {
            _fixture.Customize<Review>(c => c.FromFactory(() => ReviewFactory.CreateReview(reviewId,comment,numOfStars,date,reviewDescription,productId)));
            var review = _fixture.Create<Review>();
            return review;
        }
    }
}