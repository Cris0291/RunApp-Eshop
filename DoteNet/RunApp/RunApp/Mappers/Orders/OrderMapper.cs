﻿using Contracts.Orders.Response;
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
        public static CreateOrderCommand FromOrderRequestToOrderCommand(this OrderRequestDto orderRequest, Guid userId)
        {
            return new CreateOrderCommand(userId, orderRequest.Address == null ? null : new OrderAddress(orderRequest.Address.ZipCode, orderRequest.Address.Address, orderRequest.Address.City, orderRequest.Address.Country, orderRequest.Address.State), orderRequest.Card == null ? null : new OrderCard(orderRequest.Card.CardName, orderRequest.Card.CardNumber, orderRequest.Card.CVV, orderRequest.Card.ExpiryDate));
        }
        public static OrderDto FromOrderToOrderDto(this Order order)
        {
            return new OrderDto(order.OrderId, order.Address == null ? null : order.Address.FromAddressToAddressDto(), order.PaymentMethod == null ? null : order.PaymentMethod.FromCardToCardDto());
        }
        public static AddressDto FromAddressToAddressDto(this Address address)
        {
            return new AddressDto(address.ZipCode, address.Street, address.City, address.Country, address.State);
        }
        public static CardDto FromCardToCardDto(this Card card)
        {
            return new CardDto(card.HoldersName, card.CardNumber, card.CVV, card.ExpiryDate);
        }
        public static LineItemDtoResponse FromLineItemToLineItemDtoResponse(this LineItem lineItem)
        {
            return new LineItemDtoResponse(lineItem.LineItemID, lineItem.OrderId, lineItem.ProductId, lineItem.ProductName, lineItem.Quantity, lineItem.Price, lineItem.PriceWithDiscount);
        }
        public static List<LineItemDtoResponse> FromLineItemsToLineItemDtoResponses(this List<LineItem> lineItems)
        {
            return lineItems.Select(x => x.FromLineItemToLineItemDtoResponse()).ToList();
        }
        
    }
}
