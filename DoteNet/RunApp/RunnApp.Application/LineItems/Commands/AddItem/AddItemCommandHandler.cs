using ErrorOr;
using MediatR;
using RunApp.Domain.OrderAggregate.LineItems;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.LineItems.Commands.AddItem
{
    public class AddItemCommandHandler(IUnitOfWorkPattern unitOfWorkPattern, IOrderRepository orderRepository) : IRequestHandler<AddItemCommand, ErrorOr<LineItem>>
    {
        private readonly IOrderRepository _orderRepository = orderRepository;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        public async Task<ErrorOr<LineItem>> Handle(AddItemCommand request, CancellationToken cancellationToken)
        {
            var order = await _orderRepository.GetOrder(request.OrderId);
            if (order == null) throw new InvalidOperationException("Order was not found in the database");

            bool isProductAdded = order.CheckProductExistence(request.ProductId);
            if (isProductAdded) return Error.Failure(code: "ProductWasAlreadyAdded", description: "Product was already added");


            var errorOrresult = order.AddItem(request.ProductId, request.ProductName, request.Quantity, request.Price, request.PriceWithDiscount, request.Discount);
            if (errorOrresult.IsError) return errorOrresult.Errors;

            await _unitOfWorkPattern.CommitChangesAsync();

            return errorOrresult.Value;
        }
    }
}
