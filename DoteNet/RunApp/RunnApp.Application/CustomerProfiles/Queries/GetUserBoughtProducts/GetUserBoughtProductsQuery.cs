using ErrorOr;
using MediatR;
using RunnApp.Application.Products.Queries.GetProducts;


namespace RunnApp.Application.CustomerProfiles.Queries.GetUserBoughtProducts
{
    public record GetUserBoughtProductsQuery(Guid userId) : IRequest<ErrorOr<IEnumerable<ProductWithMainImage>>>;
}
