using MediatR;
using RunApp.Domain.ProductStatusAggregate.Events;

namespace RunnApp.Application.Products.Events
{
    public class AddOrRemoveProductLikeEventHandler : INotificationHandler<AddOrRemoveProductLike>
    {
        public Task Handle(AddOrRemoveProductLike notification, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
