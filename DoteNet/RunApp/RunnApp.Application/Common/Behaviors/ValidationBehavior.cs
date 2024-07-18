using ErrorOr;
using FluentValidation;
using FluentValidation.Results;
using MediatR;


namespace RunnApp.Application.Common.Behaviors
{
    public class ValidationBehavior<TRequest, TResponse>(IValidator<TRequest> validator) : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
        where TResponse : IErrorOr
    {
        private readonly IValidator<TRequest> _validator = validator;
        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            ValidationResult validationResult = await _validator.ValidateAsync(request);
            if (validationResult.IsValid)
            {
                return await next();
            }

            List<Error> errors = validationResult.Errors.ConvertAll(error => Error.Validation(code: error.PropertyName, description: error.ErrorMessage));

            return (dynamic)errors;
        }
    }
}
