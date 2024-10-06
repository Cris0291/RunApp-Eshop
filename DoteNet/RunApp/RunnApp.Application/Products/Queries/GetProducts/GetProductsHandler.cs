
using MediatR;
using RunApp.Domain.Products;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Products.Queries.GetProducts
{
    public class GetProductsHandler : IRequestHandler<GetProductsQuery, IEnumerable<Product>>
    {
        private readonly IProductsRepository _productsRepository;
        public GetProductsHandler(IProductsRepository productsRepository)
        {
            _productsRepository = productsRepository;
        }
        public async Task<IEnumerable<Product>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
           return await _productsRepository.GetProducts();
            
        }
    }
}
