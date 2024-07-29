namespace Contracts.Products.Requests
{
    public record ProductDiscountRequest(decimal PriceWithDiscount, string PromotionalText);
}
