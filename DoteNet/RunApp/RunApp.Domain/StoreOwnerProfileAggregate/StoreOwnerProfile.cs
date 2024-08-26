using RunApp.Domain.StoreOwnerProfileAggregate.Sales;
using RunApp.Domain.StoreOwnerProfileAggregate.Stocks;

namespace RunApp.Domain.StoreOwnerProfileAggregate
{
    public class StoreOwnerProfile
    {
        private StoreOwnerProfile() { }

        public Guid StoreOwnerProfileId { get; private set; }
        public string StoreName { get; private set; }
        public int TotalProductsSold { get; private set; }
        public decimal TotalSalesInCash { get; private set; }
        public int TotalStock { get; private set; }
        public  List<Sale> Sales { get; private set; }
        public List<Stock> Stocks { get; private set; }
    }
}
