using FluentValidation;

namespace RunnApp.Application.CustomerProfiles.Commands.AddAddress
{
    public class AddAddressCommandValidator : AbstractValidator<AddAddressCommand>
    {
        public AddAddressCommandValidator()
        {
            RuleFor(x => x.ZipCode).Matches("^[0-9]{5}(?:-[0-9]{4})?$");
            RuleFor(x => x.Street).NotEmpty().NotNull();
            RuleFor(x => x.City).NotEmpty().NotNull();
            RuleFor(x => x.BuildingNumber).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Country).NotEmpty().NotNull();
            RuleFor(x => x.State).NotEmpty().NotNull();
        }
    }
}
