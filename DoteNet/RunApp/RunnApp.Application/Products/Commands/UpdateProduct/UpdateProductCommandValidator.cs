using FluentValidation;

namespace RunnApp.Application.Products.Commands.UpdateProduct
{
    public class UpdateProductCommandValidator : AbstractValidator<UpdateProductCommand>
    {
        public UpdateProductCommandValidator()
        {
            RuleFor(update => update.Name).NotNull();
            RuleFor(update => update.Description).NotNull();
            RuleFor(update => update.Price).GreaterThanOrEqualTo(0);
            RuleFor(update => update.PriceWithDiscount).GreaterThanOrEqualTo(0m);
            RuleFor(update => update.ProductId).Custom((guid,context) =>
            {
                if (guid == Guid.Empty) context.AddFailure("Product must have a valid id");
            });
        }
    }
}
