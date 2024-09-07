using RunApp.Domain.Products;

namespace RunApp.Domain.StoreOwnerProfileAggregate.Stocks
{
    public class Stock
    {
        internal Stock() { }
        public Guid StockId { get; internal set; }
        public int? AddedStock { get; internal set; }
        public int? SoldStock { get; internal set; }
        public string ProductName { get; internal set; }
        public string Brand { get; internal set; }
        public string  ProductType { get; internal set; }
        public DateTime? StockAddedDate { get; internal set; }
        public DateTime? StockRemoveDate { get; internal set; }
        public DateTime StockDate { get; internal set; }
        public Guid StockProductId { get; internal set; }
        public Guid StoreOwnerProfileId { get; internal set; }
    }
}
