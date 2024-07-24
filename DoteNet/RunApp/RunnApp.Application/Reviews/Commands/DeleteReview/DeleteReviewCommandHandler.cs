using ErrorOr;
using MediatR;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Reviews.Commands.DeleteReview
{
    public class DeleteReviewCommandHandler(IReviewsRepository reviewsRepository, IUnitOfWorkPattern unitOfWorkPattern) : IRequestHandler<DeleteReviewCommand, ErrorOr<Success>>
    {
        private readonly IReviewsRepository _reviewsRpository = reviewsRepository;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        public async Task<ErrorOr<Success>> Handle(DeleteReviewCommand request, CancellationToken cancellationToken)
        {
            bool existReviewawait = await _reviewsRpository.ExistReview(request.ReviewId);
        }
    }
}
