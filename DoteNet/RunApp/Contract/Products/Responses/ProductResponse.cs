using Contracts.Products.Requests;

namespace Contracts.Products.Responses
{
    public record ProductResponse(Guid ProductId, string Name, string Description, decimal Price, IEnumerable<string> Bulletpoints, decimal? PriceWithDiscount, string? PromotionalText, decimal? Discount, string Brand, string Type, string Color, double Weight, string[] Categories);
}
