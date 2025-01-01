using ErrorOr;
using MediatR;
using RunApp.Domain.OrderAggregate;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Orders.Queries.GetOrder
{
    public class GetOrderQueryHandler(IOrderRepository orderRepository) : IRequestHandler<GetOrderQuery, ErrorOr<OrderWrapperDto>>
    {
        private readonly IOrderRepository _orderRepository = orderRepository;
        public async Task<ErrorOr<OrderWrapperDto>> Handle(GetOrderQuery request, CancellationToken cancellationToken)
        {
            var result = await _orderRepository.GetCurrentOrder(request.UserId);
            if (result != null && result.LineItems.Count == 0) return Error.Validation(code: "CannotHaveAnEmptyOrder", description: "Cannot have an empty order");

            return new OrderWrapperDto { Order = result };
        }
    }
}
