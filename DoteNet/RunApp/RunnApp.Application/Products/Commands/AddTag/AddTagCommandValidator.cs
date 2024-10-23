using FluentValidation;

namespace RunnApp.Application.Products.Commands.AddTag
{
    public class AddTagCommandValidator : AbstractValidator<AddTagCommand>
    {
        public AddTagCommandValidator()
        {
            RuleFor(x => x.TagName).NotEmpty().NotNull();
        }
    }
}
