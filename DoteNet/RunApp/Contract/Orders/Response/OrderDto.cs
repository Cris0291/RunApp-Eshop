using Contracts.LineItems.Response;

namespace Contracts.Orders.Response
{
    public record OrderDto(Guid OrderId, AddressDto Address, CardDto Card, LineItemDtoResponse[] Items);
}
