using RunApp.Api.CustomValidators;

namespace Contracts.Reviews.Requests
{
    public record AddReviewRequest(string comment, [EnumValidator]ReviewDescriptions reviewDescription);
    
    
}
