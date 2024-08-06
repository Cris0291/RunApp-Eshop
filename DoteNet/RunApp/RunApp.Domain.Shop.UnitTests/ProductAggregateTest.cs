using AutoFixture;
using AutoFixture.Kernel;
using ErrorOr;
using RunApp.Domain.ProductAggregate.Reviews;
using RunApp.Domain.ProductAggregate.Reviews.Common;
using RunApp.Domain.Products;
using TestsUtilities.ProductTestUtils;
using TestsUtilities.ReviewTestUtils;
using TestsUtilities.Common;
using FluentAssertions;
using Xunit.Abstractions;
using Xunit.Sdk;
using RunApp.Domain.ProductAggregate.AboutValueType;

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

            // Customize a dummy prpoduct and review
            _fixture.Customize<Product>(c => c.FromFactory(() => ProductFactory.CreateProduct()));
            _fixture.Customize<Review>(c => c.FromFactory(() => ReviewFactory.CreateReview(comment: "valid reviews", numOfStars: 3,reviewDescription: ReviewDescriptionEnums.Awesome)));

            //Create dummy product 
            Product productToTest = _fixture.Create<Product>();

            //Create dummy reviews
            List<Review> reviews = Enumerable.Range(0, 3).Select(_ => _fixture.Create<Review>()).ToList();

            //Create review to test
            Review reviewToTest = _fixture.Build<Review>()
                .FromFactory(() => ReviewFactory.CreateReview(comment: "custom test review", numOfStars: 0, reviewDescription: ReviewDescriptionEnums.BadProduct))
                .Create();
           
            reviews.Add(reviewToTest);

            //Act
            List<ErrorOr<Review>> errorOrReviews = reviews.Select(review => productToTest.AddReview(review.Comment, review.NumOfStars, review.ReviewDescription)).ToList();

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

            // Customize a dummy prpoduct and review
            _fixture.Customize<Product>(c => c.FromFactory(() => ProductFactory.CreateProduct()));
            _fixture.Customize<Review>(c => c.FromFactory(() => ReviewFactory.CreateReview(comment: "valid reviews", numOfStars: 3, reviewDescription: ReviewDescriptionEnums.Awesome)));

            //Create dummy product and review
            Product productToTest = _fixture.Create<Product>();
            Review validReview = _fixture.Create<Review>();

            //Create invalid review
            Review invalidReview =_fixture.Build<Review>()
                .FromFactory(() => ReviewFactory.CreateReview(comment: ""))
                .Create();

            //Act
            ErrorOr<Review> validResult =productToTest.AddReview(validReview.Comment, validReview.NumOfStars, validReview.ReviewDescription);
            ErrorOr<Review> invalidResult = productToTest.AddReview(invalidReview.Comment, invalidReview.NumOfStars, invalidReview.ReviewDescription);

            //Assert
            validResult.Value.Comment.Should().Be(validReview.Comment);
            invalidResult.IsError.Should().BeTrue();
            invalidResult.Errors.First().Code.Should().Be("AllReviewsMustHaveAComment");

        }
        #endregion

        #region Products

        [Fact]
        public void AddPriceWithDiscount_WhenTheDiscountIsGreaterThan80Percent_ShouldHaveAValidationError()
        {
            //Arrange

            //Create product and fake prices
            _fixture.Customize<Product>(c => c.FromFactory(() => ProductFactory.CreateProduct()));
            var product = _fixture.Create<Product>();
            decimal price = 250.30m;
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
            _fixture.Customize<Product>(c => c.FromFactory(() => ProductFactory.CreateProduct(price: 100m)));
            var product = _fixture.Create<Product>();
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
            _fixture.Customize<Product>(c => c.FromFactory(() => ProductFactory.CreateProduct()));
            var product = _fixture.Create<Product>();
            string emptyName = "";
            ICollection<string> points = product.BulletPoints.Select(P => P.BulletPoint).ToList();

            //Act
           ErrorOr<Product> errorOrProduct =  Product.CreateProduct("", product.Description, product.ActualPrice, points,product.PriceWithDiscount, product.PromotionalText);

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
            _fixture.Customize<Product>(c => c.FromFactory(() => ProductFactory.CreateProduct()));
            var product = _fixture.Create<Product>();
            string promotionalText = "";
            ICollection<string> points = product.BulletPoints.Select(P => P.BulletPoint).ToList();

            //Act
            ErrorOr<Product> errorOrProduct = Product.CreateProduct(product.Name, product.Description, product.ActualPrice, points, product.PriceWithDiscount, promotionalText);

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
            _fixture.Customize<Product>(c => c.FromFactory(() => ProductFactory.CreateProduct()));
            var product = _fixture.Create<Product>();
            string description = "";
            ICollection<string> points = product.BulletPoints.Select(P => P.BulletPoint).ToList();
              //Act
            ErrorOr<Product> errorOrProduct = Product.CreateProduct(product.Name, description, product.ActualPrice, points, product.PriceWithDiscount, product.PromotionalText);

            //Assert
            errorOrProduct.IsError.Should().BeTrue();
            errorOrProduct.Errors.First().Code.Should().Be("AllProductsMustHaveADescription");
            errorOrProduct.Errors.Count.Should().Be(1);
        
        }
        #endregion
    }
}