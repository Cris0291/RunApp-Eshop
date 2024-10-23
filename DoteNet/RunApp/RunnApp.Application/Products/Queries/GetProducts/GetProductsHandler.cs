using ErrorOr;
using MediatR;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Products.Queries.GetProducts
{
    public class GetProductsHandler : IRequestHandler<GetProductsQuery, ErrorOr<IEnumerable<ProductsJoin>>>
    {
        private readonly ILeftJoinRepository _leftJoinRepository;
        private readonly IProductsRepository _productsRepository;
        public GetProductsHandler(ILeftJoinRepository leftJoinRepository, IProductsRepository productsRepository)
        {
            _leftJoinRepository = leftJoinRepository;
            _productsRepository = productsRepository;
        }
        public async Task<ErrorOr<IEnumerable<ProductsJoin>>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
           var productsQuery =  _productsRepository.GetProducts()
                .TransformQuery()
                .AddSortingBy(request.OrderByOptions)
                .AddFiltering(request.FilterByOptions, request.FilterValue)
                .AddPaging(request.PageSize, request.PageNumZeroBased);

            var productsAndStatus =  _leftJoinRepository.GetProductsAndStatusLeftJoin(request.UserId, productsQuery);

            return await _leftJoinRepository.ExecuteQuery(productsAndStatus);
        }
    }
}
