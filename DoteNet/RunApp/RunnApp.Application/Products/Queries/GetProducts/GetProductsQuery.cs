using ErrorOr;
using MediatR;
using RunnApp.Application.Common.SortingPagingFiltering;

namespace RunnApp.Application.Products.Queries.GetProducts
{
    public record GetProductsQuery(Guid UserId, OrderByOptions OrderByOptions, FilterByOptions FilterByOptions, string FilterValue, int PageSize, int PageNumZeroBased) : IRequest<ErrorOr<IEnumerable<ProductsJoin>>>;
    
    
}
