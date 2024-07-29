using FluentValidation;
using RunApp.Domain.ProductAggregate.Reviews;

namespace RunnApp.Application.Reviews.Commands.CreateReview
{
    public class CreateReviewCommnadValidator : AbstractValidator<CreateReviewCommand>
    {
        public CreateReviewCommnadValidator()
        {
            RuleFor(command => command.comment).NotNull();
            RuleFor(command => command.numOfStars).NotNull().GreaterThanOrEqualTo(0);
        }
    }
}
