namespace Contracts.Stocks.Response
{
    public record StockResponse(int? AddedStock, string ProductName, string Brand, string ProductType, DateTime? StockAddedDate, Guid StockId);
}
