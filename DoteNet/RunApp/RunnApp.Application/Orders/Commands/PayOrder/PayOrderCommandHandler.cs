using ErrorOr;
using MediatR;
using RunApp.Domain.OrderAggregate;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Orders.Commands.PayOrder
{
    public class PayOrderCommandHandler(IOrderRepository orderRepository, IUnitOfWorkPattern unitOfWorkPattern) : IRequestHandler<PayOrderCommand, ErrorOr<Order>>
    {
        private readonly IOrderRepository _orderRepository = orderRepository;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        public async Task<ErrorOr<Order>> Handle(PayOrderCommand request, CancellationToken cancellationToken)
        {
            
        }
    }
}
