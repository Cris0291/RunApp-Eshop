using RunnApp.Application.CustomerProfiles.Common;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserReviews
{
    public record ReviewDto(Guid ReviewId, string Comment, int Rating, DateTime Date, string ReviewDescription, ProductDto? ProductDto);
}
