using Contracts.Common;

namespace Contracts.Orders.Request
{
    public record OrderRequestDto(AddressRequest Address, CardRequest Card, ItemResquestDto[] Items);
}
