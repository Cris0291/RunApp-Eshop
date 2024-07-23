using ErrorOr;
using MediatR;
using RunApp.Domain.ProductAggregate.Reviews;
using RunApp.Domain.ProductAggregate.Reviews.Common;

namespace RunnApp.Application.Reviews.Commands.CreateReview
{
    public record CreateReviewCommand(Guid ProductId, string comment, double numOfStars, ReviewDescriptionEnums reviewDescriptionEnum) : IRequest<ErrorOr<Review>>;
}
