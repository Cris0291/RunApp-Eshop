using ErrorOr;
using MediatR;
using System.Security.Claims;

namespace RunnApp.Application.Ratings.Commands
{
    public record AddRatingCommand(ClaimsPrincipal User,Guid ProductId, Guid CustomerId, int Rating) : IRequest<ErrorOr<Success>>;
    
}
