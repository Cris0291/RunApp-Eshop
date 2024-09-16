using RunApp.Domain.Common;

namespace RunApp.Domain.ReviewAggregate.Events
{
    public record DeleteReviewEvent(Guid ReviewId, Guid ProductId, Guid CustomerProfileId) : IDomainEvent;
}
