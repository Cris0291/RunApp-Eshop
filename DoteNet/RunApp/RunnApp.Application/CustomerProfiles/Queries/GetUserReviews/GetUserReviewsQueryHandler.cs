﻿using ErrorOr;
using MediatR;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserReviews
{
    public class GetUserReviewsQueryHandler(ICustomerProfileRepository profileRepository, IProductsRepository productsRepository, ILeftJoinRepository leftJoinRepository) : IRequestHandler<GetUserReviewsQuery, ErrorOr<List<ReviewWithProductImage>>>
    {
        private readonly ICustomerProfileRepository _profileRepository = profileRepository;
        private readonly IProductsRepository _productsRepository = productsRepository;
        private readonly ILeftJoinRepository _leftJoinRepository = leftJoinRepository;
        public async Task<ErrorOr<List<ReviewWithProductImage>>> Handle(GetUserReviewsQuery request, CancellationToken cancellationToken)
        {
            var customer = await _profileRepository.GetCustomerProfile(request.UserId);
            if (customer == null) throw new InvalidOperationException("User was not found. Something unexpected happened");

            if (customer.BoughtProducts.Count == 0 && customer.Reviews.Count > 0) return Error.Validation(code: "CannotReviewAProductThatHasNotBeenBought", description: "User can only review products that has bought");
            if (customer.Reviews.Count == 0) return new List<ReviewWithProductImage>();
           
            var products =  _productsRepository.GetBoughtProducts(customer.BoughtProducts);

            var productsWithMainImage = _leftJoinRepository.GetProductsWithImage(products);
            var productsImageDto = productsWithMainImage.FromProductsToProductsWithImage();

            var reviewsResult = _leftJoinRepository.GetUserReviewsWithProductImage(productsImageDto, customer.Reviews);
            return await _leftJoinRepository.ExecuteQuery(reviewsResult);
        }
    }
}
