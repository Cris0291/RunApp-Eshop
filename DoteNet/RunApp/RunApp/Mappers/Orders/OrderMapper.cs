using Contracts.Orders.Response;
using RunApp.Domain.Common.ValueType;
using RunApp.Domain.OrderAggregate;
using RunApp.Domain.OrderAggregate.LineItems;
using Contracts.LineItems.Response;
using RunnApp.Application.Orders.Commands.CreateOrder;
using Contracts.Orders.Request;

namespace RunApp.Api.Mappers.Orders
{
    public static class OrderMapper
    {
        public static OrderDto FromOrderToOrderDto(this Order order)
        {
            return new OrderDto(order.OrderId, order.Address.FromAddressToAddressDto(), order.PaymentMethod.FromCardToCardDto(), order.LineItems.FromLineItemsToLineItemDtoResponses().ToArray());
        }
        private static AddressDto FromAddressToAddressDto(this Address address)
        {
            return new AddressDto(address.ZipCode, address.Street, address.City, address.HouseNumber, address.Country, address.AlternativeStreet, address.AlternativeHouseNumber);
        }
        private static CardDto FromCardToCardDto(this Card card)
        {
            return new CardDto(card.HoldersName, card.CardNumber, card.CVV, card.ExpityDate);
        }
        public static LineItemDtoResponse FromLineItemToLineItemDtoResponse(this LineItem lineItem)
        {
            return new LineItemDtoResponse(lineItem.LineItemID, lineItem.OrderId, lineItem.ProductId, lineItem.ProductName, lineItem.Quantity, lineItem.Price, lineItem.PriceWithDiscount, lineItem.Discount);
        }
        public static List<LineItemDtoResponse> FromLineItemsToLineItemDtoResponses(this List<LineItem> lineItems)
        {
            return lineItems.Select(x => x.FromLineItemToLineItemDtoResponse()).ToList();
        }
        public static Item FromItemResquestDtoToItem(this ItemResquestDto itemResquestDto)
        {
            return new Item(itemResquestDto.ProductId, itemResquestDto.ProductName, itemResquestDto.Quantity, itemResquestDto.Price, itemResquestDto.PriceWithDiscount, itemResquestDto.Discount);
        }
        public static Item[] FromItemsResquestDtoToItems(this ItemResquestDto[] itemsResquestDto)
        {
           return itemsResquestDto.Select(x => x.FromItemResquestDtoToItem()).ToArray();
        }
    }
}
