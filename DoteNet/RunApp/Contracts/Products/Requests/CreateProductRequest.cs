namespace Contracts.Products.Requests
{
    public record CreateProductRequest(string Name, string Description, decimal Price, IEnumerable<BulletPoint> Bulletpoints, decimal? PriceWithDiscount, string? PromotionalText);

}
