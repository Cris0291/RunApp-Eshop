using ErrorOr;
using MediatR;

namespace RunnApp.Application.Photos.Commands.RemoveProductPhoto
{
    public record RemoveProductPhotoCommand(Guid ProductId, Guid StoreOwnerId, string PhotoId) : IRequest<ErrorOr<Success>>;
}
