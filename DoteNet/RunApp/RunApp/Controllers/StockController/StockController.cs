using Contracts.Stocks.Requests;
using Contracts.Stocks.Response;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RunApp.Api.Routes;
using RunApp.Api.Services;
using RunnApp.Application.Stocks.Commands.AddStock;

namespace RunApp.Api.Controllers.StockController
{
   
    public class StockController(ISender mediator) : ApiController
    {
        private readonly ISender _mediator = mediator;

        [Authorize("StoreProfile")]
        [HttpPost(ApiEndpoints.StoreOwnerProfiles.AddStock)]
        public async Task<IActionResult> AddStock(StockRequest stockRequest)
        {
           Guid storeOwnerId =  HttpContext.GetStoreOwnerId();
           var result = await _mediator.Send(new AddStockCommand(stockRequest.AddedStock, stockRequest.ProductName, stockRequest.Brand,stockRequest.ProductType,stockRequest.ProductId, storeOwnerId));

            return result.Match(value => Ok(new StockResponse(value.AddedStock,value.ProductName, value.Brand, value.ProductType, value.StockAddedDate, value.StockId)), Problem);
        }
    }
}
