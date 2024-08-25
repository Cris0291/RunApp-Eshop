using MediatR;
using Microsoft.AspNetCore.Mvc;
using RunApp.Api.Routes;
using RunnApp.Application.Products.Queries.GetProduct;
using ErrorOr;
using RunApp.Domain.Products;
using RunApp.Api.Mappers.Products;
using RunnApp.Application.Products.Queries.GetProducts;
using Contracts.Products.Requests;
using RunnApp.Application.Products.Commands.CreateProduct;
using RunnApp.Application.Products.Commands.DeleteProduct;
using RunnApp.Application.Products.Commands.AddDiscount;
using RunnApp.Application.Products.Commands.RemoveDiscount;
using Microsoft.AspNetCore.Authorization;



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

        [Authorize]
        [HttpGet(ApiEndpoints.Products.GetProductById)]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            
           var productQuery = new GetProductQuery(id);

            ErrorOr<Product> queryResponse = await _mediator.Send(productQuery);

            return queryResponse.MatchFirst(product => Ok(product.ProductToProductResponse()),
            Problem);
            
            
        }

        [Authorize]
        [HttpGet(ApiEndpoints.Products.GetProducts)]
        public async Task<IActionResult> GetAll()
        {
            GetProductsQuery getProductsQuery = new GetProductsQuery();

            IEnumerable<Product> products = await _mediator.Send(getProductsQuery);
           return Ok(products.AllProductsToProductsResponse());
        }

        [Authorize]
        [HttpPost(ApiEndpoints.Products.Create)]
        public async Task<IActionResult> CreateProduct(CreateProductRequest createProduct)
        {
            CreateProductCommand productCommand = createProduct.ProductRequestToProductCommand();
            ErrorOr<Product> productorError =  await _mediator.Send(productCommand);

            return productorError.Match(product => CreatedAtAction(nameof(Get), new { id = product.ProductId }, product.ProductToProductResponse()),
              Problem); 
        }

        [Authorize]
        [HttpPut(ApiEndpoints.Products.UpdateProduct)]
        public async Task<IActionResult> UpdateProduct([FromRoute] Guid id, UpdateProductRequest updateProduct)
        {
            var productCommand = updateProduct.UpdateProductRequestToUpdateProdcutCommand(id);

           var updatedProductResult =  await _mediator.Send(productCommand);

           return updatedProductResult.Match(result => Ok(result.ProductToProductResponse()), Problem);
        }

        [Authorize]
        [HttpDelete(ApiEndpoints.Products.DeleteProduct)]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid id)
        {
            var deleteProductCommand = new DeleteProductCommand(id);
            var deleteResult = await _mediator.Send(deleteProductCommand);

            return deleteResult.Match(result => Ok(), Problem);
        }

        [Authorize]
        [HttpPost(ApiEndpoints.Products.AddPriceWithDiscount)]
        public async Task<IActionResult> AddDiscount([FromRoute] Guid id, ProductDiscountRequest discount)
        {
            AddDiscountCommand discountCommand = new AddDiscountCommand(id, discount.PriceWithDiscount, discount.PromotionalText);

            var productWithDiscount = await _mediator.Send(discountCommand);

           return productWithDiscount.Match(result => Ok(result.ProductToProductResponse()), Problem);
        }

        [Authorize]
        [HttpDelete(ApiEndpoints.Products.DeletePriceWithDiscount)]
        public async Task<IActionResult> RemoveDiscount([FromRoute] Guid id)
        {
          var deletedDiscount = await _mediator.Send(new RemoveDiscountCommand(id));

            return deletedDiscount.MatchFirst(result =>Ok(), Problem);
        }
    }
}
