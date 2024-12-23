﻿using Contracts.Common;
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

            var order = await _mediator.Send(orderRequest.FromOrderRequestToOrderCommand(userId));

            return order.Match(value =>
            {
                return Ok(value.FromOrderToOrderDto());
            }, Problem);
        }

        [Authorize]
        [HttpPut(ApiEndpoints.Orders.ModifyOrderAddress)]
        public async Task<IActionResult> ModifyOrderAddress([FromRoute] Guid orderId, [FromBody] AddressRequest address)
        {
            var result = await _mediator.Send(new ModifyAddressCommand(orderId, address.ZipCode, address.Address,address.City, address.Country, address.State));

            return result.Match(value => Ok(value.FromAddressToAddressDto()), Problem);
        }

        [Authorize]
        [HttpPut(ApiEndpoints.Orders.ModifyPaymentMethod)]
        public async Task<IActionResult> ModifyPaymentMethod([FromRoute]Guid orderId, [FromBody] CardRequest card)
        {
            var result = await _mediator.Send(new ModifyPaymentMethodCommand(orderId, card.CardName, card.CardNumber, card.CVV, card.ExpiryDate));
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
