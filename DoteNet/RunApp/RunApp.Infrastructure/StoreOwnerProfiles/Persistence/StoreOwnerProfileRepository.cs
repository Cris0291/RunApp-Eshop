using Microsoft.EntityFrameworkCore;
using RunApp.Domain.StoreOwnerProfileAggregate;
using RunApp.Infrastructure.Common.Persistence;
using RunnApp.Application.Common.Interfaces;

namespace RunApp.Infrastructure.StoreOwnerProfiles.Persistence
{
    public class StoreOwnerProfileRepository(AppStoreDbContext appStoreDbContext) : IStoreOwnerProfileRepository
    {
        private readonly AppStoreDbContext _appStoreDbContext = appStoreDbContext;
        public async Task CreateStoreOwnerProfile(StoreOwnerProfile storeOwnerProfile)
        {
            await _appStoreDbContext.AddAsync(storeOwnerProfile);
        }

        public async Task<StoreOwnerProfile?> GetStoreOwnerProfile(Guid userId)
        {
            return await _appStoreDbContext.StoreOwnerProfiles.SingleOrDefaultAsync(x => x.Id == userId);
        }

        public async Task<bool> ExistStoreOwnerProfile(Guid userId)
        {
           return await _appStoreDbContext.StoreOwnerProfiles.AnyAsync(x => x.Id == userId);
        }

        public async Task<StoreOwnerProfile> GetStoreOwnerProfileWithStocks(Guid storeOwnerProfileId)
        {
           return  await _appStoreDbContext.StoreOwnerProfiles
                .Include(x => x.Stocks)
                .SingleAsync(x => x.StoreProfileId == storeOwnerProfileId);
        }
    }
}
