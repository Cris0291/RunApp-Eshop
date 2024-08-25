using MediatR;
using ErrorOr;
using RunApp.Domain.ProductAggregate.Reviews;
using RunnApp.Application.Common.Interfaces;
using RunApp.Domain.Products;
using RunApp.Domain.CustomerProfileAggregate;

namespace RunnApp.Application.Reviews.Commands.CreateReview
{
    public class CreateReviewCommandHandler(IReviewsRepository productsRepository, IUnitOfWorkPattern unitOfWorkPattern, ICustomerProfileRepository customerProfileRepository) : IRequestHandler<CreateReviewCommand, ErrorOr<Review>>
    {
        private readonly IReviewsRepository _reviewsRepository = productsRepository;
        private readonly IUnitOfWorkPattern _unitOfWork = unitOfWorkPattern;
        private readonly ICustomerProfileRepository _customerProfileRepository = customerProfileRepository;
        public async Task<ErrorOr<Review>> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
        {
            Product? product = await _reviewsRepository.GetProductWithReviews(request.ProductId, cancellationToken);

            if (product == null) return Error.NotFound(code: "ProductWasNotFoundWithGivenId", description: "Requested product was not found");

            CustomerProfile? customerProfile = await _customerProfileRepository.GetCustomerProfile(request.userId);
            if (customerProfile == null) return Error.NotFound(code: "CustomerProfileWasNotFoundWithGivenId", description: "Requested customer was not found");

            ErrorOr<Review> errors = product.AddReview(request.comment, request.numOfStars, request.reviewDescriptionEnum, request.ProductId, customerProfile.CustomerProfileId);

            if (errors.IsError) return errors.Errors;

            await _unitOfWork.CommitChangesAsync();

            return errors.Value;
        }
    }
}
