namespace Contracts.Orders.Request
{
    public record ItemResquestDto(Guid ProductId, string ProductName, int Quantity, decimal Price, decimal? PriceWithDiscount, decimal? Discount);
}
