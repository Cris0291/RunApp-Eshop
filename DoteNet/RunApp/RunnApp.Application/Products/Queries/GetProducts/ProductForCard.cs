using RunApp.Domain.ProductStatusAggregate;

namespace RunnApp.Application.Products.Queries.GetProducts
{
    public class ProductForCard()
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public decimal ActualPrice { get; set; }
        public int? NumberOfReviews { get; set; }
        public double? AverageRatings { get; set; }
        public decimal? PriceWithDiscount { get; set; }
        public string? PromotionalText { get; set; }
        public decimal? Discount { get; set; }
        public List<Guid> Statuses { get; set; }
        public ProductStatus? ProductStatus { get; set; }
    }
}
