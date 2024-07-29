using ErrorOr;
using MediatR;

namespace RunnApp.Application.Reviews.Commands.DeleteReview
{
    public record DeleteReviewCommand(Guid ReviewId, Guid ProductId) : IRequest<ErrorOr<Success>>;
}
