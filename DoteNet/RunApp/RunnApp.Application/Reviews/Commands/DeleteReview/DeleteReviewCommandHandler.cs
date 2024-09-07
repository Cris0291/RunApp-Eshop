using ErrorOr;
using MediatR;
using RunApp.Domain.Products;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Reviews.Commands.DeleteReview
{
    public class DeleteReviewCommandHandler(IReviewsRepository reviewsRepository, IUnitOfWorkPattern unitOfWorkPattern) : IRequestHandler<DeleteReviewCommand, ErrorOr<Success>>
    {
        private readonly IReviewsRepository _reviewsRpository = reviewsRepository;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        public async Task<ErrorOr<Success>> Handle(DeleteReviewCommand request, CancellationToken cancellationToken)
        {
            bool existReview = await _reviewsRpository.ExistReview(request.userId, request.productId, cancellationToken);

            if (!existReview) return Error.NotFound(code: "ReviewWasNotFoundWithGivenId", description: "Requested review was not found");

            Product? product = await _reviewsRpository.GetProductWithReviews(request.productId, request.userId, cancellationToken);
            if (product == null) return Error.NotFound(code: "ProductWasNotFoundWithGivenId", description: "Requested product was not found");

            ErrorOr<Success> errorOr = product.DeleteReview(request.userId, request.productId);
            if (errorOr.IsError) return errorOr.Errors;

            await _unitOfWorkPattern.CommitChangesAsync();

            return Result.Success;
        }
    }
}
