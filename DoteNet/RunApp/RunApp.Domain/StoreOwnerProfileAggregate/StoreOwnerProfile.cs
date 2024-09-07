using ErrorOr;
using RunApp.Domain.Common;
using RunApp.Domain.Products;
using RunApp.Domain.StoreOwnerProfileAggregate.Sales;
using RunApp.Domain.StoreOwnerProfileAggregate.Stocks;
using RunApp.Domain.StoreOwnerProfileAggregate.StoreOwnerProfileErrors;
using RunApp.Domain.StoreOwnerProfileAggregate.ValueTypes;

namespace RunApp.Domain.StoreOwnerProfileAggregate
{
    public class StoreOwnerProfile : ValidationHandler
    {
        private StoreOwnerProfile() { }
        public Guid StoreProfileId { get; private set; }
        public string StoreName { get; private set; }
        public int TotalProductsSold { get; private set; }
        public decimal TotalSalesInCash { get; private set; }
        public int TotalStock { get; private set; }
        public bool IsAccountPaid { get; private set; }
        public decimal InitialInvestment { get; private set; }
        public Address BussinesAdress { get; private set; }
        public Card CreditOrBussinesCard { get; private set; }
        public SalesLevel SalesLevel { get; private set; }
        public  List<Sale> Sales { get; private set; }
        public List<Stock> Stocks { get; private set; }
        public Guid Id { get; private set; }

        public static ErrorOr<StoreOwnerProfile> CreateProfile(Guid userId, string storeName, int zipCode, string street,
            string city, int buildingNumber, string country,
            string? alternativeStreet, int? alternativeBuildingNumber,
            string holdersName, int cardNumber, int cvv, DateTime expiryDate, decimal initialInvestment)
        {
            AddValidation(nameof(StoreOwnerprofileError.InitialInvestmentCannotBeLowerThan5000), ()=> initialInvestment <= 5000);
            Validate();
            if (HasError()) return Errors;

            var address = new Address()
            {
                ZipCode = zipCode,
                Street = street,
                City = city,
                BuildingNumber = buildingNumber,
                Country = country,
                AlternativeStreet = alternativeStreet,
                AlternativeBuildingNumber = alternativeBuildingNumber
            };

            var card = new Card()
            {
                HoldersName = holdersName,
                CardNumber = cardNumber,
                CVV = cvv,
                ExpityDate = expiryDate
            };

            return new StoreOwnerProfile()
            {
                StoreName = storeName,
                Id = userId,
                BussinesAdress = address,
                CreditOrBussinesCard = card,
                TotalProductsSold = 0,
                TotalSalesInCash = 0,
                TotalStock = 0,
                IsAccountPaid = false,
                InitialInvestment = initialInvestment
            };
        }
        public ErrorOr<Success> CreateStock(Product product)
        {
            var stock =  new Stock()
            {
                ProductName = product.Name,
                AddedStock = 0,
                Brand = product.Characteristic.Brand,
                ProductType = product.Characteristic.Type,
                StockProductId = product.ProductId
            };

            Stocks.Add(stock);
            return Result.Success;
        }
        public ErrorOr<Stock> AddStock(int addedStock, string productName, string brand, string productType, Guid stockProductId)
        {
            var stock = new Stock()
            {
                AddedStock = addedStock,
                ProductName = productName,
                Brand = brand,
                ProductType = productType,
                StockProductId = stockProductId
            };
            Stocks.Add(stock);
            TotalStock += 1;
            return stock;
        }
    }
}
