﻿using ErrorOr;
using MediatR;
using RunApp.Domain.Common.ValueType;

namespace RunnApp.Application.CustomerProfiles.Commands.AddPaymentMethod
{
    public record AddPaymentMethodCommand(Guid UserId, string HoldersName, string CardNumber, string CVV, DateTime ExpiryDate) : IRequest<ErrorOr<Card>>;
}