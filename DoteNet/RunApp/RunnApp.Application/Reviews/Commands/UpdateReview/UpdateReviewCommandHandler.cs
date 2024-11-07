using ErrorOr;
using MediatR;
using RunApp.Domain.ReviewAggregate;

namespace RunnApp.Application.Reviews.Commands.UpdateReview
{
    public class UpdateReviewCommandHandler() : IRequestHandler<UpdateReviewCommand, ErrorOr<Review>>
    {
        public async Task<ErrorOr<Review>> Handle(UpdateReviewCommand request, CancellationToken cancellationToken)
        {
            
        }
    }
}
