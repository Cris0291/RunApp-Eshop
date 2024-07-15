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
            CreateProductCommand createProductCommand = new(createProduct.Name,createProduct.Description, 
                createProduct.Price,createProduct.Bulletpoints.BulletPointsToStrings(),
                createProduct.PriceWithDiscount, createProduct.PromotionalText);

        }
    }
}
