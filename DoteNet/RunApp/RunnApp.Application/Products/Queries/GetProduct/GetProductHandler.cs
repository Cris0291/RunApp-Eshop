using ErrorOr;
using MediatR;
using RunApp.Domain.Products;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Products.Queries.GetProduct
{
    public class GetProductHandler : IRequestHandler<GetProductQuery, ErrorOr<ProductItemDto>>
    {
        private readonly IProductsRepository _productsRepository;
        private readonly IReviewsRepository _reviewRepository;
        private readonly IPhotoRepository _photoRepository;
        public GetProductHandler(IProductsRepository productsRepository, IReviewsRepository reviewsRepository, IPhotoRepository photoRepository)
        {
            _productsRepository = productsRepository;
            _reviewRepository = reviewsRepository;
            _photoRepository = photoRepository;
        }
        public async Task<ErrorOr<ProductItemDto>> Handle(GetProductQuery request, CancellationToken cancellationToken)
        {
            Product? product = await _productsRepository.GetProductWithCategories(request.ProductId);
            if(product is null) return Error.NotFound(code: "ProductWasNotFoundWithGivenId", description: $"Requested product was not found {request.ProductId}");

            var reviews = await _reviewRepository.GetReviewsForProduct(request.ProductId);

            var photos = await _photoRepository.GetPhotosForProduct(request.ProductId);

            var productItem = product.CreateProductItemDto(photos, reviews);

            return productItem;
        }
    }
}
