namespace Contracts.Products.Requests
{
    public record UpdateProductRequest(string Name, string Description, decimal Price, ICollection<string> Bulletpoints, decimal PriceWithDiscount, string? PromotionalText);
}
