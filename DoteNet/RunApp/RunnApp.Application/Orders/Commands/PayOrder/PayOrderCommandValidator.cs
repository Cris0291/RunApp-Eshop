using FluentValidation;

namespace RunnApp.Application.Orders.Commands.PayOrder
{
    public class PayOrderCommandValidator : AbstractValidator<PayOrderCommand>
    {
        public PayOrderCommandValidator()
        {
            RuleFor(x => x.PriceToPay).GreaterThan(0);
        }
    }
}
