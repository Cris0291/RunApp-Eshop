using ErrorOr;
using MediatR;

namespace RunnApp.Application.Products.Commands.DeleteTag
{
    public record DeleteTagCommand(Guid ProductId, Guid TagId) : IRequest<ErrorOr<Success>>;
}
