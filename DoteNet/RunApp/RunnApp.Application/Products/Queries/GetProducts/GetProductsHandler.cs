
using MediatR;
using RunApp.Domain.Products;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Products.Queries.GetProducts
{
    public class GetProductsHandler : IRequestHandler<GetProductsQuery, IEnumerable<ProductForCard>>
    {
        private readonly IProductsRepository _productsRepository;
        private readonly IProductStatusRepository _productStatusRepository;
        public GetProductsHandler(IProductsRepository productsRepository, IProductStatusRepository productStatusRepository)
        {
            _productsRepository = productsRepository;
            _productStatusRepository = productStatusRepository;
        }
        public async Task<IEnumerable<ProductForCard>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
            var products  = await _productsRepository.GetProducts(request.UserId);

            products.Select(async (x) =>
            {
                if (x.Statuses.Count == 0) return x;
                if (x.Statuses.Count > 1) throw new InvalidOperationException("User cannot have more than one like to the same product");
                var status = await _productStatusRepository.GetProductStatus(x.ProductId,x.Statuses.First());
                if(status == null) throw new InvalidOperationException("Something unexpected happened. Product status could not be found");
                x.ProductStatus = status;
                return x;
            });

            return products;
        }
    }
}
