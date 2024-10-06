namespace Contracts.LineItems.Response
{
    public record LineItemDtoResponse(Guid LineItemID, Guid OrderId,  Guid ProductId, string ProductName, int Quantity, decimal Price, decimal? PriceWithDiscount, decimal? Discount);
}
