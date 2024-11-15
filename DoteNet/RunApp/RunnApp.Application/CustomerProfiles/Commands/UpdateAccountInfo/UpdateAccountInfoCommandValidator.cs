using FluentValidation;

namespace RunnApp.Application.CustomerProfiles.Commands.UpdateAccountInfo
{
    public class UpdateAccountInfoCommandValidator : AbstractValidator<UpdateAccountInfoCommand>
    {
        public UpdateAccountInfoCommandValidator()
        {
            RuleFor(x => x.Name).NotNull().NotEmpty();
            RuleFor(x => x.NickName).NotNull().NotEmpty();
            RuleFor(x => x.Email).Matches("/\\S+@\\S+\\.\\S+/");
        }
    }
}
