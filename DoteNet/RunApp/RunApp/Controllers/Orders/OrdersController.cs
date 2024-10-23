using Contracts.Common;
using Contracts.Orders.Request;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RunApp.Api.Mappers.Orders;
using RunApp.Api.Routes;
using RunApp.Api.Services;
using RunnApp.Application.Orders.Commands.CreateOrder;
using RunnApp.Application.Orders.Commands.ModifyAddress;
using RunnApp.Application.Orders.Commands.ModifyPaymentMethod;
using RunnApp.Application.Orders.Commands.PayOrder;

namespace RunApp.Api.Controllers.Orders
{
    
    public class OrdersController(ISender mediator) : ApiController
    {
        private readonly ISender _mediator = mediator;

        [Authorize]
        [HttpPost(ApiEndpoints.Orders.Create)]
        public async Task<IActionResult> CreateOrder([FromBody] OrderRequestDto orderRequest)
        {
            Guid userId = HttpContext.GetUserId();

            var order = await _mediator.Send(new CreateOrderCommand(userId, orderRequest.Address.ZipCode, orderRequest.Address.Street, 
                                                                    orderRequest.Address.City, orderRequest.Address.BuildingNumber, 
                                                                    orderRequest.Address.Country, orderRequest.Address.AlternativeStreet, 
                                                                    orderRequest.Address.AlternativeBuildingNumber, orderRequest.Card.HoldersName, 
                                                                    orderRequest.Card.CardNumber, orderRequest.Card.CVV, 
                                                                    orderRequest.Card.ExpiryDate, orderRequest.Items.FromItemsResquestDtoToItems()));

            return order.Match(value =>
            {
                return Ok(value.FromOrderToOrderDto());
            }, Problem);
        }

        [Authorize]
        [HttpPut(ApiEndpoints.Orders.ModifyOrderAddress)]
        public async Task<IActionResult> ModifyOrderAddress([FromRoute] Guid orderId, [FromBody] AddressRequest address)
        {
            var result = await _mediator.Send(new ModifyAddressCommand(orderId, address.ZipCode, address.Street,address.City, address.BuildingNumber,
                                                                    address.Country, address.AlternativeStreet,
                                                                    address.AlternativeBuildingNumber));

            return result.Match(value => Ok(value.FromAddressToAddressDto()), Problem);
        }

        [Authorize]
        [HttpPut(ApiEndpoints.Orders.ModifyPaymentMethod)]
        public async Task<IActionResult> ModifyPaymentMethod([FromRoute]Guid orderId, [FromBody] CardRequest card)
        {
            var result = await _mediator.Send(new ModifyPaymentMethodCommand(orderId, card.HoldersName, card.CardNumber, card.CVV, card.ExpiryDate));
            return result.Match(value => Ok(value.FromCardToCardDto()), Problem);
        }

        [Authorize]
        [HttpPatch(ApiEndpoints.Orders.PayOrder)]
        public async Task<IActionResult> PayOrder([FromRoute] Guid orderId)
        {
            Guid userId = HttpContext.GetUserId();

            var result = await _mediator.Send(new PayOrderCommand(userId, orderId));

            return result.MatchFirst(value => Ok(value.FromOrderToOrderDto()), Problem);
        }
    }
}
