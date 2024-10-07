using ErrorOr;
using MediatR;
using RunApp.Domain.Common.ValueType;
using RunnApp.Application.Common.Interfaces;
using System.Diagnostics.Metrics;
using System.IO;
using System.Reflection.Emit;

namespace RunnApp.Application.Orders.Commands.ModifyAddress
{
    public class ModifyAddressCommandHandler(IOrderRepository orderRepository, IUnitOfWorkPattern unitOfWorkPattern) : IRequestHandler<ModifyAddressCommand, ErrorOr<Address>>
    {
        private readonly IOrderRepository _orderRepository = orderRepository;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        public async Task<ErrorOr<Address>> Handle(ModifyAddressCommand request, CancellationToken cancellationToken)
        {
            var order = await _orderRepository.GetOrderWithoutItems(request.OrderId);
            if (order == null) throw new InvalidOperationException("Order was not found in the database");

            order.ModifyAddress(request.ZipCode, request.Street, request.City,
                                     request.BuildingNumber, request.Country, request.AlternativeStreet,
                                     request.AlternativeBuildingNumber);

            await _unitOfWorkPattern.CommitChangesAsync();
            return order.Address;
        }
    }
}
