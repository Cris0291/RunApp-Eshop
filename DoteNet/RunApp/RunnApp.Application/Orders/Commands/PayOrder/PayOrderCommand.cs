using ErrorOr;
using MediatR;
using RunApp.Domain.OrderAggregate;

namespace RunnApp.Application.Orders.Commands.PayOrder
{
    public record PayOrderCommand(Guid UserId, decimal PriceToPay) : IRequest<ErrorOr<Order>>;
}
