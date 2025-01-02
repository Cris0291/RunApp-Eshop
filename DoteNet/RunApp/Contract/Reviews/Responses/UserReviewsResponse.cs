namespace Contracts.Reviews.Responses
{
    public record UserReviewsResponse(Guid? ProductId, string? ProductName, string? ProductImage, Guid ReviewId, int Rating, string ReviewDescription, string Comment, DateTime ReviewDate);
}
