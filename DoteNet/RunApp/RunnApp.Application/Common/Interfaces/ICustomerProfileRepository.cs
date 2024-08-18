using RunApp.Domain.CustomerProfileAggregate;

namespace RunnApp.Application.Common.Interfaces
{
    public interface ICustomerProfileRepository
    {
        Task CreateCustomerProfile(CustomerProfile);
    }
}
