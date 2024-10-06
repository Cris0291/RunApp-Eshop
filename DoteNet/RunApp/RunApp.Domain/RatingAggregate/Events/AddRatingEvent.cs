using RunApp.Domain.Common;

namespace RunApp.Domain.RatingAggregate.Events
{
    public record AddRatingEvent(Guid ProductId, Guid CustomerId, Guid RatingId, int Rating) : IDomainEvent;
}
