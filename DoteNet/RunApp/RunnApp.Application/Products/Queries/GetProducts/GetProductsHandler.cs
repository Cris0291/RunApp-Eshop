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
            var filterMappinValues = new FilterMappingValues(request.Likes, request.Stars, request.Categories, request.PriceRange, request.Search);
            var filterMappingOptions = GetFilterOptions(filterMappinValues);

            var productsQuery = _productsRepository.GetProducts();

            var productsWithMainImage = _leftJoinRepository.GetProductsWithImage(productsQuery);
            var productForCardWithImage = productsWithMainImage.TransformProductWithImageQuery();

            var productsAndStatus = _leftJoinRepository.GetProductsAndStatusLeftJoin(request.UserId, productForCardWithImage);

            var finalProductsQuery = productsAndStatus
                 .AddFiltering(filterMappinValues, filterMappingOptions)
                 .AddSortingBy(request.OrderByOptions);

            

            return await _leftJoinRepository.ExecuteQuery(finalProductsQuery);
        }
        public IEnumerable<FilterByOptions> GetFilterOptions(FilterMappingValues filterValues)
        {
            List<FilterByOptions> filterOptions = new();
            var filterType = typeof(FilterMappingValues);
            var properties = filterType.GetProperties();

            foreach (var property in properties)
            {
                if (!Enum.TryParse(property.Name, out FilterByOptions option)) throw new ArgumentException("Filter option and value did not matched");
                filterOptions.Add(option);
            }

            return filterOptions;
        }
    }
}
