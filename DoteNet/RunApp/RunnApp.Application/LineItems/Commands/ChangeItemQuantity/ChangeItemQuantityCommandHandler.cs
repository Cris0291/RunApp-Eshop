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
            throw new NotImplementedException();
        }
    }
}
