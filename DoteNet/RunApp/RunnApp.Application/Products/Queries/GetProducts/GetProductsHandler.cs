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
            var filterMappingValues = new FilterMappingValues(request.Stars, request.Categories, request.PriceRange, request.Search);
            var filterMappingOptions = GetFilterOptions(filterMappingValues);

            var productsQuery = _productsRepository.GetProducts()
                                                   .AddSortingBy(request.OrderByOptions);

            var productsWithMainImage = _leftJoinRepository.GetProductsWithImage(productsQuery);
            var productForCardWithImage = productsWithMainImage.TransformProductWithImageQuery();

            var productsAndStatus = _leftJoinRepository.GetProductsAndStatusLeftJoin(request.UserId, productForCardWithImage);

            var finalProductsQuery = productsAndStatus
                 .AddFiltering(filterMappingValues, filterMappingOptions);
                 

            

            return await _leftJoinRepository.ExecuteQuery(finalProductsQuery);
        }
        public IEnumerable<FilterByOptions> GetFilterOptions(FilterMappingValues filterValues)
        {
            List<FilterByOptions> filterOptions = new();
            var filterType = typeof(FilterMappingValues);
            var properties = filterType.GetProperties();

            foreach (var property in properties)
            {
                if (property.Name == "Stars" && filterValues.Stars == null) continue;
                if (property.Name == "Categories" && filterValues.Categories == null) continue;

                if (!Enum.TryParse(property.Name, out FilterByOptions option)) throw new ArgumentException("Filter option and value did not matched");
                filterOptions.Add(option);
            }

            return filterOptions;
        }
    }
}
