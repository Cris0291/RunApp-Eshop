using RunApp.Domain.Common;
using RunApp.Domain.CustomerProfileAggregate;
using RunApp.Domain.Products;

namespace RunApp.Domain.ReviewAggregate.Events
{
    public record AddReviewEvent(Guid ReviewId, Guid ProductId, Guid customerProfileId) : IDomainEvent;
}
