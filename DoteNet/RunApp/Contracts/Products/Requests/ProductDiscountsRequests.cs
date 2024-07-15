namespace Contracts.Products.Requests
{
    public record ProductDiscountsRequests(decimal? PriceWithDiscount, string? PromotionalText);
}
