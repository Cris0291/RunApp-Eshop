using ErrorOr;
using MediatR;

namespace RunnApp.Application.Reviews.Commands.DeleteReview
{
    public record DeleteReviewCommand(Guid ReviewId) : IRequest<ErrorOr<Success>>;
}
