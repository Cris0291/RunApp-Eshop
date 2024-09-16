using RunApp.Api.CustomValidators;

//Moved here because the contracts prject could not accept a reference to the Api project
namespace Contracts.Reviews.Requests
{
    public record AddReviewRequest(string? comment, [EnumValidator]ReviewDescriptions reviewDescription);
    
    
}
