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
using RunnApp.Application.Products.Commands.DeleteProduct;



namespace RunApp.Api.Controllers.Products
{

  
    public class ProductController : BaseApiController
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
            Problem);
            
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

            return productorError.Match(product => CreatedAtAction(nameof(Get), new { id = product.ProductId }, product),
              Problem); 
        }

        [HttpPut(ApiEndpoints.Products.UpdateProduct)]
        public async Task<IActionResult> UdateProduct([FromRoute] Guid productId, UpdateProductRequest updateProduct)
        {
            var productCommand = updateProduct.UpdateProductRequestToUpdateProdcutCommand(productId);

           var updatedProductResult =  await _mediator.Send(productCommand);

           return updatedProductResult.Match(result => Ok(), Problem);
        }

        [HttpDelete(ApiEndpoints.Products.DeleteProduct)]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid ProductId)
        {
            var deleteProductCommand = new DeleteProductCommand(ProductId);
            var deleteResult = await _mediator.Send(deleteProductCommand);

            return deleteResult.Match(result => Ok(), Problem);
        }
    }
}
