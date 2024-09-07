namespace Contracts.Stocks.Requests
{
    public record StockRequest(int AddedStock, string ProductName, string Brand, string ProductType, Guid ProductId);
}
