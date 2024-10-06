using ErrorOr;
using MediatR;
using RunApp.Domain.OrderAggregate;
using RunnApp.Application.Common.Interfaces;
using RunnApp.Application.LineItems.Commands.AddItem;
using System.Diagnostics.Metrics;
using System.IO;
using System.Reflection.Emit;

namespace RunnApp.Application.Orders.Commands.CreateOrder
{
    public class CreateOrderCommandHandler(IUnitOfWorkPattern unitOfWorkPattern, IOrderRepository orderRepository) : IRequestHandler<CreateOrderCommand, ErrorOr<Order>>
    {
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        private readonly IOrderRepository _orderRepository = orderRepository;
        public async Task<ErrorOr<Order>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            List<List<Error>> errors = new();
            var order = Order.CreateOrder(request.ZipCode, request.Street, request.City,
                                     request.BuildingNumber, request.Country, request.AlternativeStreet,
                                     request.AlternativeBuildingNumber, request.HoldersName,
                                     request.CardNumber, request.CVV, request.ExpiryDate);

            foreach(var item in request.Items)
            {
                var errorOrOrder = order.AddItem(item.ProductId, item.ProductName, item.Quantity, item.Price, 
                                                 item.PriceWithDiscount, item.Discount);

                if (errorOrOrder.IsError) errors.Add(errorOrOrder.Errors);
            }

            if (errors.Count > 0) return errors.SelectMany(x => x).ToList();

            await _orderRepository.CreateOrder(order);

            int rowsChanged = await _unitOfWorkPattern.CommitChangesAsync();
            if (rowsChanged == 0) throw new InvalidOperationException("Order could not be added to the database");

            return order;
        }
    }
}
