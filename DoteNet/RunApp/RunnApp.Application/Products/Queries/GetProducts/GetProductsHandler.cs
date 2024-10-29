using ErrorOr;
using MediatR;
using RunnApp.Application.Common.Interfaces;
using RunnApp.Application.Common.SortingPagingFiltering;

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
            var productsQuery = _productsRepository.GetProducts()
                 .TransformQuery()
                 .AddSortingBy(request.OrderByOptions);

           var productsWithFiltering = FilterProducts(productsQuery, new FilterMappingValues(request.Likes, request.Stars, request.Categories, request.PriceRange, request.Search));     

            var productsAndStatus =  _leftJoinRepository.GetProductsAndStatusLeftJoin(request.UserId, productsQuery);

            return await _leftJoinRepository.ExecuteQuery(productsAndStatus);
        }
        private IQueryable<ProductForCard> FilterProducts(IQueryable<ProductForCard> products, FilterMappingValues values)
        {
            IQueryable<ProductForCard> a;
            var filterType = typeof(FilterMappingValues);
            var properties = filterType.GetProperties();

            foreach (var property in properties)
            {
                if (!Enum.TryParse(property.Name, out FilterByOptions filterOptions)) throw new ArgumentException("I did something wrong");
                
            }
        }
    }
}
