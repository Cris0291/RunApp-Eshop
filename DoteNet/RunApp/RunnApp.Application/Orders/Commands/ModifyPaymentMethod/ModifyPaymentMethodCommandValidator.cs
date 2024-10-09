﻿using FluentValidation;

namespace RunnApp.Application.Orders.Commands.ModifyPaymentMethod
{
    public class ModifyPaymentMethodCommandValidator : AbstractValidator<ModifyPaymentMethodCommand>
    {
        public ModifyPaymentMethodCommandValidator()
        {
            RuleFor(x => x.HoldersName).NotEmpty().NotNull();
            RuleFor(x => x.CardNumber).Matches("(?<!\\d)\\d{16}(?!\\d)|(?<!\\d[ _-])(?<!\\d)\\d{4}(?=([_ -]))(?:\\1\\d{4}){3}(?![_ -]?\\d)");
            RuleFor(x => x.CVV).Matches("/^[0-9]{3,4}$/");
            RuleFor(x => x.ExpiryDate).Must((date) => date >= DateTime.Now && date < DateTime.Now.AddYears(4));
        }
    }
}
