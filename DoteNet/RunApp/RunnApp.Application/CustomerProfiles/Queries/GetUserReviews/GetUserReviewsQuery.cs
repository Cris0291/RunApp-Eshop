using ErrorOr;
using MediatR;
using RunApp.Domain.ReviewAggregate;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserReviews
{
    public record GetUserReviewsQuery(Guid UserId) : IRequest<ErrorOr<List<ReviewDto>>>;
}
