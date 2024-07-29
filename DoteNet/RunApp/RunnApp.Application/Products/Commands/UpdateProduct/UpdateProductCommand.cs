using ErrorOr;
using MediatR;
using RunApp.Domain.Products;

namespace RunnApp.Application.Products.Commands.UpdateProduct
{
    public record UpdateProductCommand(Guid ProductId, string Name, string Description, decimal Price, ICollection<string> Bulletpoints, decimal PriceWithDiscount, string? PromotionalText) : IRequest<ErrorOr<Product>>;
}
