
namespace RunApp.Domain.ProductAggregate.Categories
{
    public class Category
    {
        internal Category() { }
        public Guid CategoryId { get; internal set; }
        public string CategoryName { get; internal set; }

        internal static string[] validCategories = { "#football", "#weights", "#swimming", "#running", "#footwear", "#yoga" };

    }
}
