using ErrorOr;
using MediatR;
using RunApp.Domain.Common.ValueType;

namespace RunnApp.Application.CustomerProfiles.Commands.UpdateAddress
{
    public record UpdateAddressCommand(Guid UserId, string ZipCode, string Street, string City, int HouseNumber, string Country, string State) : IRequest<ErrorOr<Address>>;
}
