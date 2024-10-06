using FluentValidation;

namespace RunnApp.Application.Ratings.Commands
{
    public class AddRatingCommadValidator : AbstractValidator<AddRatingCommand>
    {
        public AddRatingCommadValidator()
        {
            RuleFor(x => x.Rating).GreaterThanOrEqualTo(0);
        }
    }
}
