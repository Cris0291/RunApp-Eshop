using ErrorOr;
using MediatR;

namespace RunnApp.Application.Reviews.Commands.DeleteReview
{
    public record DeleteReviewCommand(Guid userId, Guid productId) : IRequest<ErrorOr<Success>>;
}
