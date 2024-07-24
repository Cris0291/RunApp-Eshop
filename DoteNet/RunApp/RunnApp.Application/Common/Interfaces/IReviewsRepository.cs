using RunApp.Domain.Products;

namespace RunnApp.Application.Common.Interfaces
{
    public interface IReviewsRepository
    {
        Task<Product?> GetProductWithReviews(Guid ProductId);
        Task<bool> ExistReview(Guid ReviewId);
    }
}
