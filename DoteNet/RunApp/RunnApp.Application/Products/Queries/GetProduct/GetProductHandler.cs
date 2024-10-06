using ErrorOr;
using MediatR;
using RunApp.Domain.Products;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Products.Queries.GetProduct
{
    public class GetProductHandler : IRequestHandler<GetProductQuery, ErrorOr<ProductWithReviews>>
    {
        private readonly IProductsRepository _productsRepository;
        private readonly IReviewsRepository _reviewRepository;
        private readonly IRatingsRepository _ratingsRepository;
        public GetProductHandler(IProductsRepository productsRepository, IReviewsRepository reviewsRepository, IRatingsRepository ratingsRepository)
        {
            _productsRepository = productsRepository;
            _reviewRepository = reviewsRepository;
            _ratingsRepository = ratingsRepository;
        }
        public async Task<ErrorOr<ProductWithReviews>> Handle(GetProductQuery request, CancellationToken cancellationToken)
        {
            Product? product =await _productsRepository.GetProduct(request.ProductId);
            if(product is null) return Error.NotFound(code: "ProductWasNotFoundWithGivenId", description: $"Requested product was not found {request.ProductId}");

            var reviews = await _reviewRepository.GetReviewsForProduct(request.ProductId);

            var ratings = await _ratingsRepository.GetRatingsForProduct(request.ProductId);

            var reviewsDto = reviews.MatchReviewsWithRatings(ratings);

            var productWithReviews = new ProductWithReviews(product, reviewsDto);

            return productWithReviews;
        }
    }
}
