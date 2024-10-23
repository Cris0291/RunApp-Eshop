using RunApp.Domain.Common;

namespace RunApp.Domain.ReviewAggregate.Events
{
    public record AddReviewEvent(Guid ReviewId, Guid ProductId, Guid customerProfileId) : IDomainEvent;
}
