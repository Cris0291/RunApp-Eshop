using Contracts.Requests;

namespace Contracts.Responses
{
    public record ProductResponse(Guid ProductId, string Name, string Description, decimal Price, IEnumerable<BulletPoint> Bulletpoints, decimal? PriceWithDiscount, string? PromotionalText);
}
