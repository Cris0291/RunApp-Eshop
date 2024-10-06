using ErrorOr;
using MediatR;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserRatings
{
    public record GetUserRatingsQuery(Guid UserId) : IRequest<ErrorOr<List<RatingDto>>>;
}
