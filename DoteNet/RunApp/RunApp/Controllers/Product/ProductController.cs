using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using RunApp.Api.Routes;
using RunnApp.Application.Products.Queries.GetProduct;
using MediatR;
using ErrorOr;



namespace RunApp.Api.Controllers.Product
{

    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProductController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet(ApiEndpoints.Products.GetProductById)]
        public async Task<IActionResult> Get([FromRoute] Guid productId)
        {
           var productQuery = new GetProductQuery(productId);

            var queryResponse = await _mediator.Send(productQuery);
            var testproduct = queryResponse.Value;
            var testError = queryResponse.FirstError;
            
           return queryResponse.MatchFirst(testProduct => Ok(testProduct), (testError)=>Problem());
        }
    }
}
