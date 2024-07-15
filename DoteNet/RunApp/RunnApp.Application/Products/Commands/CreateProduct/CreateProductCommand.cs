using ErrorOr;
using MediatR;

namespace RunnApp.Application.Products.Commands.CreateProduct
{
     public record CreateProductCommand(string Name, string Description, decimal Price, IEnumerable<string> Bulletpoints, decimal? PriceWithDiscount, string? PromotionalText) :IRequest<ErrorOr<Guid>>;
}
