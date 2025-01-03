using FluentValidation;

namespace RunnApp.Application.Orders.Commands.ModifyAddress
{
    public class ModifyAddressCommandValidator : AbstractValidator<ModifyAddressCommand>
    {
        public ModifyAddressCommandValidator()
        {
            RuleFor(x => x.ZipCode).Matches("/^\\d{5}(?:[-\\s]\\d{4})?$/");
            RuleFor(x => x.Street).NotEmpty().NotNull();
            RuleFor(x => x.City).NotEmpty().NotNull();
            RuleFor(x => x.Country).NotEmpty().NotNull();
            RuleFor(x => x.State).NotEmpty().NotNull();
        }
    }
}
