using RunApp.Domain.Products;

namespace RunApp.Domain.StoreOwnerProfileAggregate.Stocks
{
    public class Stock
    {
        internal Stock() { }
        public Guid StockId { get; internal set; }
        public int AddedStock { get; internal set; }
        public int SoldStock { get; internal set; }
        public DateTime StockChangeDate { get; internal set; }
        public Product ProductSold { get; internal set; }
        public Guid ProductId { get; internal set; }
        public Guid StoreOwnerProfileId { get; internal set; }
    }
}
