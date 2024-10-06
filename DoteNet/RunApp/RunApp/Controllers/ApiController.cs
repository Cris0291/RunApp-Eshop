using ErrorOr;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace RunApp.Api.Controllers
{

    [ApiController]
    public class ApiController : ControllerBase
    {
        protected IActionResult Problem(List<Error> errors)
        {
            if (errors.Count == 0) return Problem();

            if (errors.All(error => error.Type == ErrorType.Validation)) return ValidationProblem(errors);

            return Problem(errors[0]);
        }
  
        protected IActionResult ValidationProblem(List<Error> errors)
        {
            ModelStateDictionary modelState = new ModelStateDictionary();
            foreach(var error in errors)
            {
                modelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem(modelState);
        }

        protected IActionResult Problem(Error error)
        {
            var errorType = error.Type switch
            {
                ErrorType.NotFound => StatusCodes.Status404NotFound,
                ErrorType.Conflict => StatusCodes.Status409Conflict,
                ErrorType.Validation => StatusCodes.Status400BadRequest,
                ErrorType.Forbidden => StatusCodes.Status403Forbidden,
                _ => StatusCodes.Status500InternalServerError
            };
            return Problem(statusCode: errorType, detail: error.Description);
        }
    }
}
