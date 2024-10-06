using RunApp.Domain.ProductAggregate.Reviews;

namespace TestsUtilities.ProductTestUtils
{
    public static partial class Constants
    {
        public static class Product
        {
            public static readonly Guid ProductId = new Guid("40b29017-9546-4b22-8eda-ab2003015f38");
            public static readonly string Name = "Test product";
            public static readonly string Description = "This is just a dummy description";
            public static readonly decimal Price = 200.50m;
            public static readonly ICollection<string> BulletPoints = ["A", "Test", "Bulletpoint collection"];
            public static readonly decimal PriceWithDiscount = 100.80m;
            public static readonly string PromotioanlText = "Great discount";
            public static readonly decimal Discount = 50.50m;
            public static readonly List<Review> Reviews = new();
        }
    }
}
