using ErrorOr;
using RunApp.Domain.Common;
using RunApp.Domain.Common.ValueType;
using RunApp.Domain.OrderAggregate.Events;
using RunApp.Domain.OrderAggregate.LineItems;
using RunApp.Domain.ProductAggregate.ProductErrors;
using System.Diagnostics.Metrics;
using System.IO;
using System.Reflection.Emit;


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
        public Address? Address { get; private set; }
        public Card? PaymentMethod { get; private set; }
        public List<LineItem> LineItems { get; private set;}

        public static Order CreateOrder(Guid userId, Address? address, Card? card)
        {
            return new Order
            {
                Address = address,
                PaymentMethod = card,
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
        public void ModifyAddress(string zipCode, string street, string city, string country, string state)
        {
            if(Address == null)
            {
                Address = new Address
                {
                    ZipCode = zipCode,
                    City = city,
                    Street = street,
                    Country = country,
                    State = state
                };
            }
            else
            {
                Address.ZipCode = zipCode;
                Address.Street = street;
                Address.City = city;
                Address.Country = country;
                Address.State = state;
            }
        }
        public void ModifyPaymentMethod(string holdersName, string cardNumber, string cvv, DateTime expiryDate)
        {
            if (PaymentMethod == null)
            {
                PaymentMethod = new Card
                {
                    HoldersName = holdersName,
                    CardNumber = cardNumber,
                    CVV = cvv,
                    ExpiryDate = expiryDate,
                };
            }
            else
            {
                PaymentMethod.HoldersName = holdersName;
                PaymentMethod.CardNumber = cardNumber;
                PaymentMethod.CVV = cvv;
                PaymentMethod.ExpiryDate = expiryDate;
            }
        }
        public void CommunicateToUserOrderCreation()
        {
            RaiseEvent(new CreateOrderEvent(Id, OrderId));
        }
        public ErrorOr<Order> PayOrder(Guid userId)
        {
            IsPaid = true;

            var boughtProducts = LineItems.Select(x => x.ProductId);
            if (boughtProducts.Count() == 0) return Error.Validation(code: "CannotPayAnOrderThaHasNoItems", description: "Current order has no items. Please add some items to the cart");

            RaiseEvent(new AddBoughtProductsEvent(userId, boughtProducts));

            return this;
        }
    }
}
