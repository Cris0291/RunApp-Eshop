using MediatR;
using RunApp.Domain.RatingAggregate.Events;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.CustomerProfiles.Events
{
    public class AddRatingEventHandler(ICustomerProfileRepository customerProfileRepository, IUnitOfWorkPattern unitOfWorkPattern) : INotificationHandler<AddRatingEvent>
    {
        private readonly ICustomerProfileRepository _customerProfileRepository = customerProfileRepository;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        public async Task Handle(AddRatingEvent notification, CancellationToken cancellationToken)
        {
            var customer  = await _customerProfileRepository.GetCustomerProfile(notification.CustomerId);
            if (customer == null) throw new InvalidOperationException("Customer was not found");

            customer.AddRating(notification.RatingId);

            int wasAdded = await _unitOfWorkPattern.CommitChangesAsync();
            if (wasAdded == 0) throw new InvalidOperationException("Changes were not saved to the database");
        }
    }
}
