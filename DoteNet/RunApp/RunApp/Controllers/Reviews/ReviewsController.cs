﻿using Contracts.Reviews.Requests;
using Microsoft.AspNetCore.Mvc;
using RunApp.Api.Routes;
using RunApp.Api.Mappers.Reviews;
using MediatR;
using ErrorOr;
using RunnApp.Application.Reviews.Commands.DeleteReview;
using RunApp.Api.Services;
using Microsoft.AspNetCore.Authorization;
using RunnApp.Application.Reviews.Commands.CreateReview;
using RunApp.Domain.ReviewAggregate;
using RunApp.Domain.ReviewAggregate.ReviewEnum;


namespace RunApp.Api.Controllers.Reviews
{


    public class ReviewsController(IMediator mediator, ILogger<ReviewsController> logger) : ApiController
    {
        private readonly IMediator _mediator = mediator;
        private readonly ILogger<ReviewsController> _logger = logger;

        [Authorize]
        [HttpPost(ApiEndpoints.Products.AddReview)]
        public async Task<IActionResult> AddReview([FromRoute] Guid id, AddReviewRequest reviewRequest, CancellationToken cancellationToken)
        {
           Guid userId = HttpContext.GetUserId();
            
           ReviewDescriptionEnums reviewEnum = ReviewDescriptionEnums.FromName(reviewRequest.reviewDescription.ToString());
           CreateReviewCommand reviewCommand = reviewRequest.ReviewRequestToReviewCommand(id,reviewEnum, userId);

            ErrorOr<Review> reviewsOrError = await _mediator.Send(reviewCommand, cancellationToken);

            return reviewsOrError.Match( Ok, Problem);
        }

        [Authorize]
        [HttpDelete(ApiEndpoints.Products.DeleteReview)]
        public async Task<IActionResult> DeleteReview([FromRoute] Guid ProductId)
        {
            Guid userId = HttpContext.GetUserId();
            ErrorOr<Success> errorOr = await _mediator.Send(new DeleteReviewCommand(userId, ProductId));
            return errorOr.MatchFirst(value => Ok(), Problem);
        }
    }
}
