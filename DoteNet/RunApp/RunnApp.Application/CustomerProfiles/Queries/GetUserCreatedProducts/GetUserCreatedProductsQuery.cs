using ErrorOr;
using MediatR;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserCreatedProducts
{
    public record GetUserCreatedProductsQuery(Guid UserId) : IRequest<ErrorOr<Success>>;
}
