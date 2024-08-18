using Microsoft.EntityFrameworkCore;
using RunApp.Domain.ProductAggregate.Reviews;
using RunApp.Domain.Products;
using RunApp.Infrastructure.Common.Persistence;
using RunnApp.Application.Common.Interfaces;

namespace RunApp.Infrastructure.Reviews.Persistence
{
    public class ReviewRepository(AppStoreDbContext appStoreDbContext) : IReviewsRepository
    {
        private readonly AppStoreDbContext _appStoreDbContext = appStoreDbContext;
        public async Task<Product?> GetProductWithReviews(Guid productId, CancellationToken cancellationToken)
        {
            Product? product =  await _appStoreDbContext.Products
                .Include(p => p.Reviews)
                .SingleOrDefaultAsync(p => p.ProductId == productId, cancellationToken);

            return product;
        }
        public async Task<Product?> GetProductWithReviews(Guid productId, Guid userId, CancellationToken cancellationToken)
        {
            Product? product = await _appStoreDbContext.Products
                .Include(p => p.Reviews.Where(r => r.Id == userId && r.ProductId == productId))
                .SingleOrDefaultAsync(p => p.ProductId == productId, cancellationToken);

            return product;
        }

        public async Task<bool> ExistReview(Guid userId, Guid productId, CancellationToken cancellationToken)
        {
            bool existReview = await _appStoreDbContext.Set<Review>().AnyAsync(r => r.Id == userId && r.ProductId == productId);
            return existReview;
        }
    }
}
