using MediatR;
using RunApp.Domain.RatingAggregate.Events;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Products.Events
{
    public class AddRatingEventHandler(IProductsRepository productsRepository, IUnitOfWorkPattern unitOfWorkPattern) : INotificationHandler<AddRatingEvent>
    {
        private readonly IProductsRepository _productsRepository = productsRepository;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        public async Task Handle(AddRatingEvent notification, CancellationToken cancellationToken)
        {
            var product = await _productsRepository.GetProduct(notification.ProductId);
            if (product == null) throw new InvalidOperationException("Product was not found");

            product.AddRating(notification.RatingId, notification.Rating);

            int wasAdded = await _unitOfWorkPattern.CommitChangesAsync();
            if (wasAdded == 0) throw new InvalidOperationException("Changes were not saved to the database");
        }
    }
}
