using MediatR;
using ErrorOr;
using RunApp.Domain.ProductAggregate.Reviews;
using RunnApp.Application.Common.Interfaces;
using RunApp.Domain.Products;

namespace RunnApp.Application.Reviews.Commands.CreateReview
{
    public class CreateReviewCommandHandler(IReviewsRepository productsRepository, IUnitOfWorkPattern unitOfWorkPattern) : IRequestHandler<CreateReviewCommand, ErrorOr<Review>>
    {
        private readonly IReviewsRepository _reviewsRepository = productsRepository;
        private readonly IUnitOfWorkPattern _unitOfWork = unitOfWorkPattern;
        public async Task<ErrorOr<Review>> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
        {
            Product? product = await _reviewsRepository.GetProductWithReviews(request.ProductId, cancellationToken);

            if (product == null) return Error.NotFound(code: "ProductWasNotFoundWithGivenId", description: "Requested product was not found");

           ErrorOr<Review> errors = product.AddReview(request.comment, request.numOfStars, request.reviewDescriptionEnum);

            if (errors.IsError) return errors.Errors;

            await _unitOfWork.CommitChangesAsync();

            return errors.Value;
        }
    }
}
