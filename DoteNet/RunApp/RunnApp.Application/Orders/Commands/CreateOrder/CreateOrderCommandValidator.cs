using FluentValidation;

namespace RunnApp.Application.Orders.Commands.CreateOrder
{
    public class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
    {
        public CreateOrderCommandValidator()
        {
            RuleFor(x => x.ZipCode).Matches("^[0-9]{5}(?:-[0-9]{4})?$");
            RuleFor(x => x.Street).NotEmpty().NotNull();
            RuleFor(x => x.City).NotEmpty().NotNull();
            RuleFor(x => x.BuildingNumber).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Country).NotEmpty().NotNull();
            RuleFor(x => x.AlternativeStreet).NotEmpty().NotNull().When(x => x.AlternativeStreet != null);
            RuleFor(x => x.AlternativeBuildingNumber).GreaterThanOrEqualTo(0).When(x => x.AlternativeBuildingNumber.HasValue);
            RuleFor(x => x.HoldersName).NotEmpty().NotNull();
            RuleFor(x => x.CardNumber).Matches("(?<!\\d)\\d{16}(?!\\d)|(?<!\\d[ _-])(?<!\\d)\\d{4}(?=([_ -]))(?:\\1\\d{4}){3}(?![_ -]?\\d)");
            RuleFor(x => x.CVV).Matches("/^[0-9]{3,4}$/");
            RuleFor(x => x.ExpiryDate).Must((date) => date >= DateTime.Now && date < DateTime.Now.AddYears(4));
            RuleForEach(x => x.Items).SetValidator(new ItemValidator());
        }
    }
}
