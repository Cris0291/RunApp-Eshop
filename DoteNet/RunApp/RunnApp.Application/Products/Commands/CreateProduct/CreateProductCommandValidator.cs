using FluentValidation;

namespace RunnApp.Application.Products.Commands.CreateProduct
{
    public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
    {
        public CreateProductCommandValidator()
        {
            RuleFor(command => command.Name).NotNull();
            RuleFor(command => command.Description).NotNull();
            RuleFor(command => command.Price).GreaterThanOrEqualTo(0);
            RuleFor(command => command.PriceWithDiscount).GreaterThanOrEqualTo(0m);
        }
    }
}
