using ErrorOr;
using RunApp.Domain.Common;
using RunApp.Domain.CustomerProfileAggregate.ProductStatuses;
using RunApp.Domain.CustomerProfileAggregate.ProductStatuses.ProductStatusErrors;
using RunApp.Domain.CustomerProfileAggregate.ValueTypes;

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
        public Address? ShippingAdress { get; private set; }
        public List<ProductStatus> Statuses { get; private set; }
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

        public ErrorOr<Success> CreateOrUpdateProductStatus(Guid productId, Dictionary<string, bool> statuses, bool isCreate)
          {
            AddValidation(nameof(ProductStatusError.LikeAndDislikeStatusesCannotBeSetAtTheSameTime), () => statuses.ContainsKey("Like") && statuses.ContainsKey("Dislike"));
            Validate();
            if (HasError()) return Errors;

            var properties = typeof(ProductStatus).GetProperties();
            var status = GetProductStatusBasedOnCreateOrUpdate(isCreate , productId);
            foreach (var property in properties)
            {
                if (property.Name == "ProductId" || property.Name == "Id") continue;
                if (statuses.ContainsKey(property.Name))
                {
                    property.SetValue(status, statuses[property.Name]);
                }
                else
                {
                    property.SetValue(status, null);
                } 
            }
            if(isCreate) 
                status.ProductId = productId;
            Statuses.Add(status);
            return Result.Success;
        }

        private ProductStatus GetProductStatusBasedOnCreateOrUpdate(bool isCreate, Guid productId)
        {
            if(isCreate) return new ProductStatus();

           var status =  Statuses.SingleOrDefault(x => x.ProductId == productId);
            if (status == null) throw new InvalidOperationException("Given status was not found for the corresponding user and product");

            return status;
        }
    }
}
