using ErrorOr;
using RunApp.Domain.Common;
using RunApp.Domain.CustomerProfileAggregate.ValueTypes;


namespace RunApp.Domain.CustomerProfileAggregate
{
    public class CustomerProfile : Entity
    {
        internal CustomerProfile() { }

        public List<Guid> Reviews { get; internal set; }
        public List<Guid> Ratings { get; internal set; }
        public List<Guid> Statuses { get; internal set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string NickName { get; private set; }
        public int? Phone { get; private set; }
        public Address? ShippingAdress { get; private set; }
        public Guid Id { get; private set; }

        public static ErrorOr<CustomerProfile> CreateCustomerProfile(string name, string email, string nickname, Guid id)
        {

            return new CustomerProfile
            {
                Name = name,
                Email = email,
                NickName = nickname,
                Id = id
            };

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
    }
}
