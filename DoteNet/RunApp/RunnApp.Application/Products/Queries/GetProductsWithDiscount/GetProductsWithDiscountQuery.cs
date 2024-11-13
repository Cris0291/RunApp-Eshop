using ErrorOr;
using MediatR;
using RunApp.Domain.Products;

namespace RunnApp.Application.Products.Queries.GetProductsWithDiscount
{
    public record GetProductsWithDiscountQuery() : IRequest<IEnumerable<Product>>;
}
