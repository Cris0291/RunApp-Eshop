using ErrorOr;
using MediatR;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserReviews
{
    public class GetUserReviewsQueryHandler(ICustomerProfileRepository profileRepository, IReviewsRepository reviewsRepository, IProductsRepository productsRepository) : IRequestHandler<GetUserReviewsQuery, ErrorOr<List<ReviewDto>>>
    {
        private readonly ICustomerProfileRepository _profileRepository = profileRepository;
        private readonly IReviewsRepository _reviewsRepository = reviewsRepository;
        private readonly IProductsRepository _productsRepository = productsRepository;
        public async Task<ErrorOr<List<ReviewDto>>> Handle(GetUserReviewsQuery request, CancellationToken cancellationToken)
        {
            var customer = await _profileRepository.GetCustomerProfile(request.UserId);
            if (customer == null) throw new InvalidOperationException("User was not found. Something unexpected happened");

            if (customer.Reviews.Count == 0) return new List<ReviewDto>();

            var reviews = await _reviewsRepository.GetReviewsForCustomer(customer.Reviews);

            if (customer.BoughtProducts.Count == 0) return Error.Validation(code: "CannotReviewAProductThatHasNotBeenBought", description: "User can only review products that has bought");
            var products = await _productsRepository.GetBoughtProducts(customer.BoughtProducts);

           return  reviews.CreateReviewDtoList(products);
        }
    }
}
