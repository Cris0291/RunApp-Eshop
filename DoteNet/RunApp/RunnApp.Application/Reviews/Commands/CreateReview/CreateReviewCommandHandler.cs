using MediatR;
using ErrorOr;
using RunnApp.Application.Common.Interfaces;
using RunApp.Domain.ReviewAggregate;
using RunApp.Domain.ReviewAggregate.ReviewErrors;

namespace RunnApp.Application.Reviews.Commands.CreateReview
{
    public class CreateReviewCommandHandler(IReviewsRepository reviewsRepository, IUnitOfWorkPattern unitOfWorkPattern, IProductsRepository productsRepository, ICustomerProfileRepository customerProfileRepository) : IRequestHandler<CreateReviewCommand, ErrorOr<Review>>
    {
        private readonly IReviewsRepository _reviewsRepository = reviewsRepository;
        IProductsRepository _productsRepository = productsRepository;
        ICustomerProfileRepository _customerProfileRepository = customerProfileRepository;
        private readonly IUnitOfWorkPattern _unitOfWork = unitOfWorkPattern;
        public async Task<ErrorOr<Review>> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
        {
            var existProduct = await _productsRepository.ExistProduct(request.ProductId);
            if (!existProduct) return Error.NotFound(code: "ProductWasNotFoundWithGivenId", description: "Requested product was not found");

            bool existReview = await _reviewsRepository.ExistReview(request.UserId,request.ProductId);
            if (existReview) return ReviewError.UserCannotAddMoreThanOneReviewPerproduct;

            var review  = Review.CreateReview(request.Comment, request.ReviewDescriptionEnum, request.ProductId, request.UserId);

            await _unitOfWork.CommitChangesAsync();

            return review;
        }
    }
}
