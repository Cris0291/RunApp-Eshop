using RunApp.Domain.ReviewAggregate.ReviewEnum;

namespace TestsUtilities.ReviewTestUtils
{
    public static partial class Constants
    {
        public static class Review
        {
            public static readonly Guid id = new Guid("256e2ae1-2df0-4e8b-bcfd-bc313dc4721a");
            public static readonly string Comment = "A test review";
            public static readonly DateTime Date = DateTime.Now;
            public static readonly ReviewDescriptionEnums ReviewDesccription = ReviewDescriptionEnums.Excellent;
            public static readonly Guid ProductId = new Guid("40b29017-9546-4b22-8eda-ab2003015f38");
        }
    }
}
