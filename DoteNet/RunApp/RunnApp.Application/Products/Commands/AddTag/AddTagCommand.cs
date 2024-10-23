using ErrorOr;
using MediatR;
using RunApp.Domain.ProductAggregate.Tags;

namespace RunnApp.Application.Products.Commands.AddTag
{
    public record AddTagCommand(Guid ProductId, string TagName) : IRequest<ErrorOr<Tag>>;
}
