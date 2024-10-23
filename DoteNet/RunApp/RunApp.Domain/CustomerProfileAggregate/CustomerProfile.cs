using ErrorOr;
using RunApp.Domain.Common;
using RunApp.Domain.Common.ValueType;



namespace RunApp.Domain.CustomerProfileAggregate
{
    public class CustomerProfile : Entity
    {
        internal CustomerProfile() { }

        public List<Guid> Reviews { get; internal set; } = new();
        public List<Guid> Ratings { get; internal set; } = new();
        public List<Guid> Statuses { get; internal set; } = new();
        public List<Guid> BoughtProducts { get; internal set; } = new();
        public List<Guid> Orders { get; internal set; } = new();
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string NickName { get; private set; }
        public int? Phone { get; private set; }
        public Address? ShippingAdress { get; private set; }
        public Card? PaymentMethod { get; private set; }
        public Guid Id { get; private set; }

        public static ErrorOr<CustomerProfile> CreateCustomerProfile(string name, string email, string nickname, Guid id)
        {

            return new CustomerProfile
            {
                Name = name,
                Email = email,
                NickName = nickname,
                Id = id,
                Reviews = new(),
                Ratings = new(),
                Statuses = new(),
                BoughtProducts = new(),
                Orders = new(),
            };

        }
        public Address AddAddress(string ZipCode, string Street, string City,
                                     int BuildingNumber, string Country, 
                                     string? AlternativeStreet, int? AlternativeBuildingNumber)
        {
            ShippingAdress = new Address
            {
                ZipCode = ZipCode,
                Street = Street,
                City = City,
                HouseNumber = BuildingNumber,
                Country = Country,
                AlternativeStreet = AlternativeStreet,
                AlternativeHouseNumber = AlternativeBuildingNumber,
            };

            return ShippingAdress;
        }
        public Card AddPaymentMethod(string HoldersName, string CardNumber, string CVV, DateTime ExpiryDate)
        {
            PaymentMethod = new Card
            {
                CVV = CVV,
                HoldersName = HoldersName,
                CardNumber = CardNumber,
                ExpityDate = ExpiryDate
            };

            return PaymentMethod;
        }
        public bool IsProductBought(Guid productId)
        {
            return BoughtProducts.Contains(productId);
        }
        public void AddReview(Guid reviewId)
        {
            if (Reviews.Contains(reviewId)) throw new InvalidOperationException("Cannot add more than one review per user");

            Reviews.Add(reviewId);
        }
        public void DeleteReview(Guid reviewId)
        {
            var wasRemoved = Reviews.Remove(reviewId);
            if (!wasRemoved) throw new InvalidOperationException("Review was not removerd");
        }
        public void AddProductStatus(Guid productStatusId)
        {
            if (Statuses.Contains(productStatusId)) throw new InvalidOperationException("Cannot add more than one like or dislike per user");

            Statuses.Add(productStatusId);
        }

        public void AddRating(Guid raitingId)
        {
            if (Ratings.Contains(raitingId)) throw new InvalidOperationException("Cannot rate twice a product");
            Ratings.Add(raitingId);
        }
        public void AddOrder(Guid orderId)
        {
            if(Orders.Contains(orderId)) throw new InvalidOperationException("Cannot add the same order twice");
            Orders.Add(orderId);
        }
        public void AddBoughtProducts(IEnumerable<Guid> boughtProducts)
        {
            foreach (var product in boughtProducts)
            {
                BoughtProducts.Add(product);
            }
        }
    }
}
