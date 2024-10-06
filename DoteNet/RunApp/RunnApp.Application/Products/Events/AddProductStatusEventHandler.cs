using MediatR;
using RunApp.Domain.ProductStatusAggregate.Events;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Products.Events
{
    public class AddProductStatusEventHandler(IProductsRepository productsRepository, IUnitOfWorkPattern unitOfWorkPattern) : INotificationHandler<AddProductStatusEvent>
    {
        private readonly IProductsRepository _productsRepository = productsRepository;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        public async Task Handle(AddProductStatusEvent notification, CancellationToken cancellationToken)
        {
            var product = await _productsRepository.GetProduct(notification.ProductId);
            if (product == null) throw new InvalidOperationException("Product was not found with the given id");

            product.AddProductStatus(notification.CustomerId);

            await _unitOfWorkPattern.CommitChangesAsync();
        }
    }
}
