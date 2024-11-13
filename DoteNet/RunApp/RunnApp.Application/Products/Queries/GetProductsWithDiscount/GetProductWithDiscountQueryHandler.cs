using ErrorOr;
using MediatR;
using RunApp.Domain.Products;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Products.Queries.GetProductsWithDiscount
{
    public class GetProductWithDiscountQueryHandler(IProductsRepository productsRepository) : IRequestHandler<GetProductsWithDiscountQuery, IEnumerable<Product>>
    {
        IProductsRepository _productsRepository = productsRepository;
        public async Task<IEnumerable<Product>> Handle(GetProductsWithDiscountQuery request, CancellationToken cancellationToken)
        {
            return await _productsRepository.GetLatestDiscounts();
        }
    }
}
