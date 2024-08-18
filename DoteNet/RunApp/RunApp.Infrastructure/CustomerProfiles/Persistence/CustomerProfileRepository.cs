using RunApp.Domain.CustomerProfileAggregate;
using RunApp.Infrastructure.Common.Persistence;
using RunnApp.Application.Common.Interfaces;


namespace RunApp.Infrastructure.CustomerProfiles.Persistence
{
    public class CustomerProfileRepository(AppStoreDbContext appStoreDbContext) : ICustomerProfileRepository
    {
        private readonly AppStoreDbContext _appStoreDbContext = appStoreDbContext;
        public async Task CreateCustomerProfile(CustomerProfile customerProfile)
        {
            await _appStoreDbContext.AddAsync(customerProfile);
        }
    }
}
