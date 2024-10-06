using ErrorOr;
using MediatR;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserRatings
{
    public class GetUserRatingsQueryHandlerIReadOnlyCollection(ICustomerProfileRepository profileRepository, IRatingsRepository ratingsRepository, IProductsRepository productsRepository) : IRequestHandler<GetUserRatingsQuery, ErrorOr<List<RatingDto>>>
    {
        private readonly ICustomerProfileRepository _profileRepository = profileRepository;
        private readonly IRatingsRepository _ratingsRepository = ratingsRepository;
        private readonly IProductsRepository _productsRepository = productsRepository;
        public async Task<ErrorOr<List<RatingDto>>> Handle(GetUserRatingsQuery request, CancellationToken cancellationToken)
        {
            var customer = await _profileRepository.GetCustomerProfile(request.UserId);
            if(customer == null) throw new InvalidOperationException("User was not found. Something unexpected happened");

            if (customer.Ratings.Count == 0) return new List<RatingDto>();
            var ratings = await _ratingsRepository.GetRatingsForUser(request.UserId);
            
            if(customer.BoughtProducts.Count == 0) return Error.Validation(code: "CannotRateAProductThatHasNotBeenBought", description: "User can only rate products that has bought");
            var boughtProducts =  await _productsRepository.GetBoughtProducts(customer.BoughtProducts);

            return ratings.CreateRatingDto(boughtProducts);
        }
    }
}
