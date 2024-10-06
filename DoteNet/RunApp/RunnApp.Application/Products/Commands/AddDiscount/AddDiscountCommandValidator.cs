using FluentValidation;
using FluentValidation.Validators;

namespace RunnApp.Application.Products.Commands.AddDiscount
{
    public class AddDiscountCommandValidator :  AbstractValidator<AddDiscountCommand>
    {
        public AddDiscountCommandValidator()
        {
            RuleFor(d => d.PriceWithDiscount).GreaterThanOrEqualTo(0m);
            RuleFor(d => d.PromotionalText).NotNull().NotEmpty();
        }
    }
}
