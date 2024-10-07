using ErrorOr;
using MediatR;
using RunApp.Domain.Common.ValueType;

namespace RunnApp.Application.Orders.Commands.ModifyAddress
{
    public record ModifyAddressCommand(Guid OrderId,string ZipCode, string Street, string City,
                                     int BuildingNumber, string Country, string? AlternativeStreet,
                                     int? AlternativeBuildingNumber) : IRequest<ErrorOr<Address>>;
}
