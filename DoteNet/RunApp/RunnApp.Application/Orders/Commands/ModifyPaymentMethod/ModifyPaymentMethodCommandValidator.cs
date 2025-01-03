using FluentValidation;

namespace RunnApp.Application.Orders.Commands.ModifyPaymentMethod
{
    public class ModifyPaymentMethodCommandValidator : AbstractValidator<ModifyPaymentMethodCommand>
    {
        public ModifyPaymentMethodCommandValidator()
        {
            RuleFor(x => x.HoldersName).NotEmpty().NotNull();
            RuleFor(x => x.CardNumber).Matches("/^(?:\\d[ -]*?){13,16}$/");
            RuleFor(x => x.CVV).Matches("/^[0-9]{3,4}$/");
            RuleFor(x => x.ExpiryDate).Matches(@"^(0[1-9]|1[0-2])\/\d{2}(\d{2})?$").WithMessage("Expiration date must be in MM/YY or MM/YYYY format.")
            .Must(BeAValidExpirationDate).WithMessage("Expiration date cannot be in the past.");
        }

        private bool BeAValidExpirationDate(string expirationDate)
        {
            // Parse the expiration date
            DateTime expiryDate;
            if (expirationDate.Length == 5) // MM/YY format
            {
                // Expiry year (YY) needs to be 20 + year to form a valid year
                string year = "20" + expirationDate.Substring(3, 2);
                string month = expirationDate.Substring(0, 2);
                string fullDate = month + "/01/" + year;
                return DateTime.TryParse(fullDate, out expiryDate) && expiryDate >= DateTime.Now;
            }
            else if (expirationDate.Length == 7) // MM/YYYY format
            {
                return DateTime.TryParseExact(expirationDate, "MM/yyyy", null, System.Globalization.DateTimeStyles.None, out expiryDate) && expiryDate >= DateTime.Now;
            }
            return false;
        }
    }
}
