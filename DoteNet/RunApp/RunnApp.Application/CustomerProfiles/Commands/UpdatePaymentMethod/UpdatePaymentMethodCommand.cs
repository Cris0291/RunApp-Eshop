using ErrorOr;
using MediatR;
using RunApp.Domain.Common.ValueType;

namespace RunnApp.Application.CustomerProfiles.Commands.UpdatePaymentMethod
{
    public record UpdatePaymentMethodCommand(Guid UserId, string HoldersName, string CardNumber, string CVV, DateTime ExpiryDate) : IRequest<ErrorOr<Card>>;
}
