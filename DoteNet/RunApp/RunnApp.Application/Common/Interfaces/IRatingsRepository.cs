using RunApp.Domain.RatingAggregate;

namespace RunnApp.Application.Common.Interfaces
{
    public interface IRatingsRepository
    {
        Task AddRating(Rating rating);
        Task<Rating?> GetRating(Guid productId, Guid CustomerId);
        Task<List<Rating>> GetRatingsForProduct(Guid productId);
        Task<List<Rating>> GetRatingsForUser(Guid usertId);
    }
}
