namespace Contracts.Products.Requests
{
    public record CreateProductRequest(string Name, string Description, decimal Price, ICollection<BulletPoint> Bulletpoints, decimal PriceWithDiscount, string? PromotionalText);

}
