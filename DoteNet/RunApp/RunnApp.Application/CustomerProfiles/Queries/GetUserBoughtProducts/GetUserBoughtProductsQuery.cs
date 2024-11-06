using ErrorOr;
using MediatR;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserBoughtProducts
{
    public record GetUserBoughtProductsQuery(Guid userId) : IRequest<ErrorOr<Success>>;
}
