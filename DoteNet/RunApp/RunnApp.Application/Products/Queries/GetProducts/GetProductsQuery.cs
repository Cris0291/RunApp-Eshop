using ErrorOr;
using MediatR;
using RunApp.Domain.Products;

namespace RunnApp.Application.Products.Queries.GetProducts
{
    public record GetProductsQuery(Guid UserId) : IRequest<IEnumerable<ProductForCard>>;
    
    
}
