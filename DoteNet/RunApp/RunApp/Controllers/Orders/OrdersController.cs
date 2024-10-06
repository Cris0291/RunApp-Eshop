using Contracts.Orders.Request;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RunApp.Api.Mappers.Orders;
using RunApp.Api.Routes;
using RunApp.Api.Services;
using RunnApp.Application.Orders.Commands.CreateOrder;

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
    }
}
