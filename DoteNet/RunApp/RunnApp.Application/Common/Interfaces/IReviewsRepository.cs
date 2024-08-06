using RunApp.Domain.Products;

namespace RunnApp.Application.Common.Interfaces
{
    public interface IReviewsRepository
    {
        Task<Product?> GetProductWithReviews(Guid ProductId, CancellationToken cancellationToken);
        Task<Product?> GetProductWithReviews(Guid ProductId, Guid ReviewId, CancellationToken cancellationToken);
        Task<bool> ExistReview(Guid ReviewId, CancellationToken cancellationToken);
        
    }
}
