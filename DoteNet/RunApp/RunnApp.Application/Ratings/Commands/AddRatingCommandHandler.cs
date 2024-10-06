using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using RunApp.Domain.RatingAggregate;
using RunnApp.Application.Common.Authorization;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Ratings.Commands
{
    public class AddRatingCommandHandler(IUnitOfWorkPattern unitOfWorkPattern, IRatingsRepository ratingsRepository, IAuthorizationService authorizationService) : IRequestHandler<AddRatingCommand, ErrorOr<Success>>
    {
        private readonly IRatingsRepository _ratingsRepository = ratingsRepository;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        private readonly IAuthorizationService _authorizationService = authorizationService;
        public async Task<ErrorOr<Success>> Handle(AddRatingCommand request, CancellationToken cancellationToken)
        {
            Rating? rating;
            var authResult =  await _authorizationService.AuthorizeAsync(request.User, new AuthorizeRatingDto(request.ProductId, request.CustomerId), "ProductMustBeBoughtInOrderToBeRated");
            if (!authResult.Succeeded) return Error.Forbidden(code: "CanRateOnlyProductsThatWereBought", description: "Only bought products can be rated");

            rating = await _ratingsRepository.GetRating(request.ProductId, request.CustomerId);

            if(rating == null)
            {
                rating  = Rating.CreateRating(request.ProductId, request.CustomerId, request.Rating);
                rating.Rate(request.Rating);

                await _ratingsRepository.AddRating(rating);

                await _unitOfWorkPattern.CommitChangesAsync();
            }

            rating.Rate(request.Rating);
            await _unitOfWorkPattern.CommitChangesAsync();

            return Result.Success;
        }
    }
}
