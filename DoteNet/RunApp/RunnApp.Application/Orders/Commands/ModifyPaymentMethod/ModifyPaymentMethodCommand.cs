﻿using ErrorOr;
using MediatR;
using RunApp.Domain.Common.ValueType;

namespace RunnApp.Application.Orders.Commands.ModifyPaymentMethod
{
    public record ModifyPaymentMethodCommand(Guid OrderId, string HoldersName,string CardNumber, string CVV, DateTime ExpiryDate) : IRequest<ErrorOr<Card>>;
}