using ErrorOr;
using MediatR;
using RunnApp.Application.Common.SortingPagingFiltering;

namespace RunnApp.Application.Products.Queries.GetProducts
{
    public record GetProductsQuery(Guid UserId, OrderByOptions OrderByOptions, int filterByLikes, int filterByStars, string[] Categories, int[] PriceRange, string search) : IRequest<ErrorOr<IEnumerable<ProductsJoin>>>;
    
    
}
