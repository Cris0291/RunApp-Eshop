using FluentValidation;

namespace RunnApp.Application.Orders.Commands.CreateOrder
{
    public class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
    {
        public CreateOrderCommandValidator()
        {
            RuleFor(x => x.OrderAddress!.ZipCode).Matches("^[0-9]{5}(?:-[0-9]{4})?$").When(x => x.OrderAddress != null);
            RuleFor(x => x.OrderAddress!.Address).NotEmpty().NotNull().When(x => x.OrderAddress != null);
            RuleFor(x => x.OrderAddress!.City).NotEmpty().NotNull().When(x => x.OrderAddress != null); 
            RuleFor(x => x.OrderAddress!.Country).NotEmpty().NotNull().When(x => x.OrderAddress != null);
            RuleFor(x => x.OrderCard!.CardName).NotEmpty().NotNull().When(x => x.OrderCard != null);
            RuleFor(x => x.OrderCard!.CardNumber).Matches("(?<!\\d)\\d{16}(?!\\d)|(?<!\\d[ _-])(?<!\\d)\\d{4}(?=([_ -]))(?:\\1\\d{4}){3}(?![_ -]?\\d)").When(x => x.OrderCard != null);
            RuleFor(x => x.OrderCard!.CVV).Matches("/^[0-9]{3,4}$/").When(x => x.OrderCard != null);
            RuleFor(x => x.OrderCard!.ExpiryDate).Must((date) => date >= DateTime.Now && date < DateTime.Now.AddYears(4)).When(x => x.OrderCard != null);
        }
    }
}
