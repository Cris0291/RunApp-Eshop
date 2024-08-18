using ErrorOr;
using RunApp.Domain.Common;
using RunApp.Domain.CustomerProfileAggregate.CustomerProfileErrors;
using RunApp.Domain.CustomerProfileAggregate.ProductStatuses;
using RunApp.Domain.CustomerProfileAggregate.ValueTypes;
using System.Text.RegularExpressions;

namespace RunApp.Domain.CustomerProfileAggregate
{
    public class CustomerProfile : Entity
    {
        internal CustomerProfile() { }
        public Guid CustomerProfileId { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string NickName { get; private set; }
        public int? Phone { get; private set; }
        public Address ShippingAdress { get; private set; }
        public List<ProductStatus> Statuses { get; private set; }
        public Guid Id { get; private set; }

        public static ErrorOr<CustomerProfile> CreateCustomerProfile(string name, string email, string nickname, Guid id)
        {
            AddValidation(nameof(CustomerProfileError.EmailCannotBeNullOrEmpty), () => string.IsNullOrEmpty(email));
            AddValidation(nameof(CustomerProfileError.NickNameCannotBeNullOrEmpty), () => string.IsNullOrEmpty(nickname));
            AddValidation(nameof(CustomerProfileError.UserNameCannotBeNullOrEmpty), () => string.IsNullOrEmpty(name));
            AddValidation(nameof(CustomerProfileError.EmailDoesNotHaveCorrectFormat), () => Regex.IsMatch(email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase));
            Validate();
            if (HasError()) return Errors;

            return new CustomerProfile
            {
                Name = name,
                Email = email,
                NickName = nickname,
                Id = id
            };

        }
    }
}
