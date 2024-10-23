
namespace RunApp.Domain.ProductAggregate.Tags
{
    public class Tag
    {
        internal Tag() { }
        public Guid TagId { get; internal set; }
        public string TagName { get; internal set; }

        internal static string[] validTags = { "#football", "#weights", "#swimming", "#running", "#footwear", "#yoga" };

    }
}
