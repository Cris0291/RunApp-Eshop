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
using RunnApp.Application.Products.Commands.AddDiscount;
using RunnApp.Application.Products.Commands.RemoveDiscount;



namespace RunApp.Api.Controllers.Products
{

   
    public class ProductController : ApiController
    {
        private readonly IMediator _mediator;
        private readonly ILogger<ProductController> _log;
        public ProductController(IMediator mediator, ILogger<ProductController> log)
        {
            _mediator = mediator;
            _log = log;
        }

        [HttpGet(ApiEndpoints.Products.GetProductById)]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            
           var productQuery = new GetProductQuery(id);

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
        public async Task<IActionResult> CreateProduct([FromBody]CreateProductRequest createProduct)
        {
            CreateProductCommand productCommand = createProduct.ProductRequestToProductCommand();
            ErrorOr<Product> productorError =  await _mediator.Send(productCommand);

            return productorError.Match(product => CreatedAtAction(nameof(Get), new { id = product.ProductId }, product.ProductToProductResponse()),
              Problem); 
        }

        [HttpPut(ApiEndpoints.Products.UpdateProduct)]
        public async Task<IActionResult> UpdateProduct([FromRoute] Guid productId, UpdateProductRequest updateProduct)
        {
            var productCommand = updateProduct.UpdateProductRequestToUpdateProdcutCommand(productId);

           var updatedProductResult =  await _mediator.Send(productCommand);

           return updatedProductResult.Match(result => Ok(result.ProductToProductResponse()), Problem);
        }

        [HttpDelete(ApiEndpoints.Products.DeleteProduct)]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid ProductId)
        {
            var deleteProductCommand = new DeleteProductCommand(ProductId);
            var deleteResult = await _mediator.Send(deleteProductCommand);

            return deleteResult.Match(result => Ok(), Problem);
        }

        [HttpPost(ApiEndpoints.Products.AddPriceWithDiscount)]
        public async Task<IActionResult> AddDiscount([FromRoute] Guid productId, ProductDiscountRequest discount)
        {
            AddDiscountCommand discountCommand = new AddDiscountCommand(productId, discount.PriceWithDiscount, discount.PromotionalText);

            var productWithDiscount = await _mediator.Send(discountCommand);

           return productWithDiscount.Match(result => Ok(result.ProductToProductResponse()), Problem);
        }

        [HttpDelete(ApiEndpoints.Products.DeletePriceWithDiscount)]
        public async Task<IActionResult> RemoveDiscount([FromRoute] Guid productId)
        {
          var deletedDiscount = await _mediator.Send(new RemoveDiscountCommand(productId));

            return deletedDiscount.MatchFirst(result =>Ok(), Problem);
        }
    }
}
