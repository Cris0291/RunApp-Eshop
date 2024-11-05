using RunApp.Domain.Products;
using RunnApp.Application.CustomerProfiles.Queries.GetUserLikes;
using RunnApp.Application.Products.Queries.GetProducts;

namespace RunnApp.Application.Common.Interfaces
{
    public interface ILeftJoinRepository
    {
        IQueryable<ProductUserLikesDto> GetProductsAndStatusLeftJoin(Guid UserId);
        IQueryable<ProductsJoin> GetProductsAndStatusLeftJoin(Guid UserId, IQueryable<ProductForCard> products);
        IQueryable<ProductWithMainImage> GetProductsWithImage(IQueryable<Product> products);
        Task<List<T>> ExecuteQuery<T>(IQueryable<T> query);
    }
}
