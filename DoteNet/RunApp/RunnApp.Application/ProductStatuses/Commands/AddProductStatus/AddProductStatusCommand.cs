using ErrorOr;
using MediatR;

namespace RunnApp.Application.ProductStatuses.Commands.AddProductStatus
{
    public record AddProductStatusCommand(Guid ProductId, Guid UserId, bool? Like, bool? Dislike, bool? Viewed, bool? Bought) : IRequest<ErrorOr<Success>>;
}
