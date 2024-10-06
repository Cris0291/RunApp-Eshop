using RunnApp.Application.CustomerProfiles.Common;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserRatings
{
    public record RatingDto(Guid RatingId, int NumOfStars, DateTime DateOfRate, ProductDto ProductDto);
}
