using ErrorOr;
using MediatR;

namespace RunnApp.Application.Products.Commands.DeleteProduct
{
    public record DeleteProductCommand(Guid ProductId) : IRequest<ErrorOr<Success>>;
    
    
}
