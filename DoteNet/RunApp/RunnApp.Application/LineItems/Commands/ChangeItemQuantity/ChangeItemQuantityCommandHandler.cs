using ErrorOr;
using MediatR;
using RunApp.Domain.OrderAggregate.LineItems;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.LineItems.Commands.ChangeItemQuantity
{
    public class ChangeItemQuantityCommandHandler(IOrderRepository orderRepository, IUnitOfWorkPattern unitOfWorkPattern) : IRequestHandler<ChangeItemQuantityCommand, ErrorOr<LineItem>>
    {
        private readonly IOrderRepository _orderRepository = orderRepository;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern; 
        public async Task<ErrorOr<LineItem>> Handle(ChangeItemQuantityCommand request, CancellationToken cancellationToken)
        {
            var order = await _orderRepository.GetOrder(request.OrderId);
            if (order == null) throw new InvalidOperationException("Order was not found in the database");

            var result = order.ChangeItemQuantity(request.Quantity, request.ProductId);
            if (result.IsError) return result.Errors;

            await _unitOfWorkPattern.CommitChangesAsync();

            return result.Value;
        }
    }
}
