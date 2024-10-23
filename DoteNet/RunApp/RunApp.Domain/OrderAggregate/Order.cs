using ErrorOr;
using RunApp.Domain.Common;
using RunApp.Domain.Common.ValueType;
using RunApp.Domain.OrderAggregate.Events;
using RunApp.Domain.OrderAggregate.LineItems;
using RunApp.Domain.ProductAggregate.ProductErrors;


namespace RunApp.Domain.OrderAggregate
{
    public class Order : Entity
    {
        internal Order() { }
        public Guid OrderId { get; private set; }
        public Guid Id { get; private set; }
        public bool IsPaid { get; private set;}
        public DateTime DateOfPayment { get; private set; }
        public decimal TotalPrice { get; private set; }
        public Address Address { get; private set; }
        public Card PaymentMethod { get; private set; }
        public List<LineItem> LineItems { get; private set;}

        public static Order CreateOrder(Guid userId, string ZipCode, string Street, string City,
                                     int BuildingNumber, string Country, string? AlternativeStreet,
                                     int? AlternativeBuildingNumber, string HoldersName,
                                     string CardNumber, string CVV, DateTime ExpiryDate)
        {
            return new Order
            {
                Address = new Address
                {
                    ZipCode = ZipCode,
                    Street = Street,
                    City = City,
                    HouseNumber = BuildingNumber,
                    Country = Country,
                    AlternativeStreet = AlternativeStreet,
                    AlternativeHouseNumber = AlternativeBuildingNumber,
                },
                PaymentMethod = new Card
                {
                    CVV = CVV,
                    HoldersName = HoldersName,
                    CardNumber = CardNumber,
                    ExpityDate = ExpiryDate
                },
                IsPaid = false,
                Id = userId,
            };
        }
        public ErrorOr<LineItem> AddItem(Guid productId, string productName, int quantity, decimal price, decimal? priceWithDiscount, decimal? discount)
        {
            decimal maximumDiscount = 0.7m;
            AddValidation(nameof(ProductError.DiscountPricesMustBeMaximum70Percent), () => priceWithDiscount < price - (price * maximumDiscount));
            AddValidation(nameof(ProductError.ActualPriceCannotBeLowerThanPriceWithDiscount), () => priceWithDiscount.HasValue && price < priceWithDiscount.Value);
            Validate();
            if (HasError()) return Errors;

           var item =  new LineItem
            {
                ProductId = productId,
                ProductName = productName,
                Quantity = quantity,
                Price = price,
                PriceWithDiscount = priceWithDiscount,
                Discount = discount
            };

            LineItems.Add(item);
            return item;
        }
        public bool CheckProductExistence(Guid productId)
        {
            return LineItems.Any(x => x.ProductId == productId);
        }
        public LineItem DeleteItem(Guid productId)
        {
            return LineItems.Single(x => x.ProductId == productId);
        }
        public ErrorOr<LineItem> ChangeItemQuantity(int quantity, Guid productId)
        {
            var item = LineItems.SingleOrDefault(x => x.ProductId == productId);
            if (item == null) return Error.NotFound(code: "ItemWasNotFound", description: "Requested item was not found in your order");

            item.Quantity = quantity;
            return item;
        }
        public void ModifyAddress(string ZipCode, string Street, string City,
                                     int BuildingNumber, string Country, string? AlternativeStreet,
                                     int? AlternativeBuildingNumber)
        {
            Address.ZipCode = ZipCode;
            Address.Street = Street;
            Address.City = City;
            Address.HouseNumber = BuildingNumber;
            Address.Country = Country;
            Address.AlternativeStreet = AlternativeStreet;
            Address.AlternativeHouseNumber = AlternativeBuildingNumber;
        }
        public void ModifyPaymentMethod(string HoldersName, string CardNumber, string CVV, DateTime ExpiryDate)
        {
            PaymentMethod.HoldersName = HoldersName;
            PaymentMethod.CardNumber = CardNumber;
            PaymentMethod.CVV = CVV;
            PaymentMethod.ExpityDate = ExpiryDate;
        }
        public void CommunicateToUserOrderCreation()
        {
            RaiseEvent(new CreateOrderEvent(Id, OrderId));
        }
        public void PayOrder(Guid userId)
        {
            IsPaid = true;

            var boughtProducts = LineItems.Select(x => x.ProductId);
            RaiseEvent(new AddBoughtProductsEvent(userId, boughtProducts));
        }
    }
}
