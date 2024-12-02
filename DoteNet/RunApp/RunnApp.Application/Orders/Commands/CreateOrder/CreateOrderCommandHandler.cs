using ErrorOr;
using MediatR;
using RunApp.Domain.OrderAggregate;
using RunnApp.Application.Common.Interfaces;
using RunApp.Domain.Common.ValueType;

namespace RunnApp.Application.Orders.Commands.CreateOrder
{
    public class CreateOrderCommandHandler(IUnitOfWorkPattern unitOfWorkPattern, IOrderRepository orderRepository) : IRequestHandler<CreateOrderCommand, ErrorOr<Order>>
    {
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        private readonly IOrderRepository _orderRepository = orderRepository;
        public async Task<ErrorOr<Order>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var address = request.OrderAddress == null ? null : new Address
            {
                Country = request.OrderAddress.Country,
                City = request.OrderAddress.City,
                ZipCode = request.OrderAddress.ZipCode,
                State = request.OrderAddress.State,
                Street = request.OrderAddress.Address
            };

            var card = request.OrderCard == null ? null : new Card
            {
                CardNumber = request.OrderCard.CardNumber,
                HoldersName = request.OrderCard.CardName,
                CVV = request.OrderCard.CVV,
                ExpiryDate = request.OrderCard.ExpiryDate,
            };

            var order = Order.CreateOrder(request.UserId, address , card);

            await _orderRepository.CreateOrder(order);
            order.CommunicateToUserOrderCreation();

            int rowsChanged = await _unitOfWorkPattern.CommitChangesAsync();
            if (rowsChanged == 0) throw new InvalidOperationException("Order could not be added to the database");

            return order;
        }
    }
}
