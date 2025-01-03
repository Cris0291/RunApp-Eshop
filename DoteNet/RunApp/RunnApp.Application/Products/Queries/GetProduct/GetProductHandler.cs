using ErrorOr;
using MediatR;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Products.Queries.GetProduct
{
    public class GetProductHandler(ILeftJoinRepository leftJoinRepository, IProductsRepository productsRepository, IReviewsRepository reviewsRepository) : IRequestHandler<GetProductQuery, ErrorOr<ProductItemDto>>
    {
        private readonly ILeftJoinRepository _leftJoinRepository = leftJoinRepository;
        private readonly IProductsRepository _productsRepository = productsRepository;
        private readonly IReviewsRepository _reviewsRepository = reviewsRepository;
        public async Task<ErrorOr<ProductItemDto>> Handle(GetProductQuery request, CancellationToken cancellationToken)
        {
            var existProduct = await _productsRepository.ExistProduct(request.ProductId);
            if(!existProduct) return Error.NotFound(code: "ProductWasNotFoundWithGivenId", description: $"Requested product was not found {request.ProductId}");

            var product = _productsRepository.GetProductWithCategoriesQuery(request.ProductId);
            var productsWithImage = _leftJoinRepository.GetProductsWithImage(product);

            var productItemDtoQuery = productsWithImage.CreateProductItemDto();

            var existReviews = await _reviewsRepository.ExistReviewsForProduct(request.ProductId);
            if (!existReviews)  return (await _leftJoinRepository.ExecuteQuery(productItemDtoQuery))[0];

            var reviewsWithCustomers = _leftJoinRepository.GetReviewsWithCustomer(request.ProductId);
            var reviewsDtoQuery = reviewsWithCustomers.CreateReviewDto();

            var productItemDto =  (await _leftJoinRepository.ExecuteQuery(productItemDtoQuery))[0];
            var reviewsDto = await _leftJoinRepository.ExecuteQuery(reviewsDtoQuery);

            productItemDto.Reviews = reviewsDto;

            return productItemDto;
        }
    }
}
