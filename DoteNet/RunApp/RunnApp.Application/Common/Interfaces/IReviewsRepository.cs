﻿using RunApp.Domain.Products;
using RunApp.Domain.ReviewAggregate;

namespace RunnApp.Application.Common.Interfaces
{
    public interface IReviewsRepository
    {
        Task AddReview(Review review);
        Task<bool> ExistReview(Guid userId, Guid productId);
        Task<Review?> GetReview(Guid userId, Guid productId);
        Task RemoveReview(Review review);
        Task<List<Review>> GetReviewsForProduct(Guid productId);
    }
}
