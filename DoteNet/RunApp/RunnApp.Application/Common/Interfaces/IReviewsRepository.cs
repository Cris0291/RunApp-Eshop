using RunApp.Domain.Products;

namespace RunnApp.Application.Common.Interfaces
{
    public interface IReviewsRepository
    {
        Task<Product?> GetProductWithReviews(Guid productId, CancellationToken cancellationToken);
        Task<Product?> GetProductWithReviews(Guid productId, Guid userId, CancellationToken cancellationToken);
        Task<bool> ExistReview(Guid userId, Guid productId, CancellationToken cancellationToken);
        
    }
}
