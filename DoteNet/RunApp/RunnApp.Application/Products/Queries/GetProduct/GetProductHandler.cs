using ErrorOr;
using MediatR;
using RunApp.Domain.Products;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Products.Queries.GetProduct
{
    public class GetProductHandler : IRequestHandler<GetProductQuery, ErrorOr<Product?>>
    {
        private readonly IProductsRepository _productsRepository;
        public GetProductHandler(IProductsRepository productsRepository)
        {
            _productsRepository = productsRepository;
        }
        public async Task<ErrorOr<Product?>> Handle(GetProductQuery request, CancellationToken cancellationToken)
        {
            Product? product =await _productsRepository.GetProduct(request.ProductId);

            if(product is null)
            {
                return Error.NotFound(code: "ProductWasNotFoundWithGivenId", description: "Requested product was not found");
            }

            return product;
        }
    }
}
