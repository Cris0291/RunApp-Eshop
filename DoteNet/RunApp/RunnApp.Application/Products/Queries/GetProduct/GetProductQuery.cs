using MediatR;
using ErrorOr;
using RunApp.Domain.Products;

namespace RunnApp.Application.Products.Queries.GetProduct
{
    public record GetProductQuery(Guid ProductId) : IRequest<ErrorOr<Product?>>;


}
