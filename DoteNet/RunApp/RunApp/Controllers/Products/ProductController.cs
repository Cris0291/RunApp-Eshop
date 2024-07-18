using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using RunApp.Api.Routes;
using RunnApp.Application.Products.Queries.GetProduct;
using MediatR;
using ErrorOr;
using RunApp.Domain.Products;
using RunApp.Api.Mappers.Products;
using RunnApp.Application.Products.Queries.GetProducts;
using Contracts.Products.Requests;
using RunnApp.Application.Products.Commands.CreateProduct;



namespace RunApp.Api.Controllers.Products
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

            ErrorOr<Product> queryResponse = await _mediator.Send(productQuery);

           return queryResponse.MatchFirst(product => Ok(product.ProductToProductResponse()),
            error => (ObjectResult)NotFound(error));
            
        }

        [HttpGet(ApiEndpoints.Products.GetProducts)]
        public async Task<IActionResult> GetAll()
        {
            GetProductsQuery getProductsQuery = new GetProductsQuery();

            IEnumerable<Product> products = await _mediator.Send(getProductsQuery);
           return Ok(products.AllProductsToProductsResponse());
        }

        [HttpPost(ApiEndpoints.Products.Create)]
        public async Task<IActionResult> CreateProduct(CreateProductRequest createProduct)
        {
            CreateProductCommand productCommand = createProduct.ProductRequestToProductCommand();
            ErrorOr<Product> productorError =  await _mediator.Send(productCommand);

            return productorError.Match(product => (IActionResult)CreatedAtAction(nameof(Get), new { id = product.ProductId }, product),
               errors =>
               {
                   var problems =errors.ConvertAll(error => new ProblemDetails()
                   {
                       Status = 404,
                       Detail = error.Description,
                       Title = "A validation error ocurred"

                   });

                   return BadRequest(problems);
               }
                ); ;
        }

        [HttpPut(ApiEndpoints.Products.UpdateProduct)]
        public async Task<IActionResult> UdateProduct([FromRoute] Guid productId, UpdateProductRequest updateProduct)
        {
            var productCommand = updateProduct.UpdateProductRequestToUpdateProdcutCommand(productId);

           var updatedProductResult =  await _mediator.Send(productCommand);

           return updatedProductResult.Match(result => Ok(), errors =>
            {
                if (errors.First().Type == ErrorType.NotFound) return (IActionResult)NotFound();

                var problems =  errors.ConvertAll(error => new ProblemDetails()
                {
                    Status =404,
                    Detail = error.Description,
                    Title = "A validation error ocurred"
                });

                return BadRequest(problems);
            });
        }
    }
}
