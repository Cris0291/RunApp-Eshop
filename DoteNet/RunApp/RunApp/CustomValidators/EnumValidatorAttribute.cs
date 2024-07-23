using System.ComponentModel.DataAnnotations;

namespace RunApp.Api.CustomValidators
{
    public class EnumValidatorAttribute: ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            
        }
    }
}
