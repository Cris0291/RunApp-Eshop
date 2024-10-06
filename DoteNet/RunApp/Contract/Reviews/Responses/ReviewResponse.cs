using Contracts.Rates.Response;
using Contracts.Reviews.Requests;

namespace Contracts.Reviews.Responses
{
    public record ReviewResponse(string Comment, DateTime Date, string ReviewDescription, RatingResponse RatingResponse);
}
