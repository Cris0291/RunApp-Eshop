using Microsoft.EntityFrameworkCore;
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

        public async Task<CustomerProfile?> GetCustomerProfile(Guid id)
        {
            var customerProfile = await _appStoreDbContext.CustomerProfiles.SingleOrDefaultAsync(x => x.Id == id);
            return customerProfile;
        }
        public async Task<bool> ExistCustomerProfile(Guid id)
        {
            bool isUser = await _appStoreDbContext.CustomerProfiles.AnyAsync(x => x.Id == id);
            return isUser;
        }
    }
}
