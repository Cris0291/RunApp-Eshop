using FluentValidation;

namespace RunnApp.Application.CustomerProfiles.Commands.UpdateAddress
{
    public class UpdateAddressCommnadValidator : AbstractValidator<UpdateAddressCommand>
    {
        public UpdateAddressCommnadValidator()
        {
            RuleFor(x => x.ZipCode).Matches("^[0-9]{5}(?:-[0-9]{4})?$");
            RuleFor(x => x.Street).NotEmpty().NotNull();
            RuleFor(x => x.City).NotEmpty().NotNull();
            RuleFor(x => x.HouseNumber).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Country).NotEmpty().NotNull();
            RuleFor(x => x.State).NotEmpty().NotNull();
        }
    }
}
