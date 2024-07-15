using ErrorOr;
using MediatR;
using RunApp.Domain.Products;

namespace RunnApp.Application.Products.Queries.GetProducts
{
    public record GetProductsQuery() : IRequest<IEnumerable<Product>>;
    
    
}
