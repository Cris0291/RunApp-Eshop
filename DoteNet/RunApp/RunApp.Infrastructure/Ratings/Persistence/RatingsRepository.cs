using Microsoft.EntityFrameworkCore;
using RunApp.Domain.RatingAggregate;
using RunApp.Infrastructure.Common.Persistence;
using RunnApp.Application.Common.Interfaces;

namespace RunApp.Infrastructure.Ratings.Persistence
{
    public class RatingsRepository(AppStoreDbContext storeDbContext) : IRatingsRepository
    {
        private readonly AppStoreDbContext _storeDbContext = storeDbContext;
        public async Task AddRating(Rating rating)
        {
            await _storeDbContext.AddAsync(rating);
        }
        public async Task<Rating?> GetRating(Guid productId, Guid customerId)
        {
            return await _storeDbContext.Ratings.SingleOrDefaultAsync(x => x.ProductId == productId && x.Id == customerId);
        }
        public async Task<List<Rating>> GetRatingsForProduct(Guid productId)
        {
            return await _storeDbContext.Ratings.Where(x => x.ProductId == productId).ToListAsync();
        }
        public async Task<List<Rating>> GetRatingsForUser(Guid usertId)
        {
            return await _storeDbContext.Ratings.Where(x => x.Id == usertId).ToListAsync();
        }
    }
}
