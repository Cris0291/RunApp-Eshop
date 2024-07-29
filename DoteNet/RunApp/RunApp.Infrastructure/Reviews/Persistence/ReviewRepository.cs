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
        public async Task<Product?> GetProductWithReviews(Guid ProductId, CancellationToken cancellationToken)
        {
            Product? product =  await _appStoreDbContext.Products
                .Include(p => p.Reviews)
                .SingleOrDefaultAsync(p => p.ProductId == ProductId, cancellationToken);

            return product;
        }
        public async Task<Product?> GetProductWithReview(Guid ProductId, Guid ReviewId, CancellationToken cancellationToken)
        {
            Product? product = await _appStoreDbContext.Products
                .Include(p => p.Reviews.Where(r => r.ReviewId == ReviewId))
                .SingleOrDefaultAsync(p => p.ProductId == ProductId, cancellationToken);

            return product;
        }

        public async Task<bool> ExistReview(Guid ReviewId, CancellationToken cancellationToken)
        {
            bool existReview = await _appStoreDbContext.Set<Review>().AnyAsync(r => r.ReviewId == ReviewId);
            return existReview;
        }
    }
}
