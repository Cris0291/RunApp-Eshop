using ErrorOr;
using MediatR;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Photos.Commands.AddProductPhoto
{
    public class AddProductPhotoCommandHandler(IPhotoAccessor photoAccessor, IUnitOfWorkPattern unitOfWorkPattern) : IRequestHandler<AddProductPhotoCommand, ErrorOr<PhotoResult>>
    {
        private readonly IPhotoAccessor _photoAccessor = photoAccessor;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        public async Task<ErrorOr<PhotoResult>> Handle(AddProductPhotoCommand request, CancellationToken cancellationToken)
        {
            var photoResult = await _photoAccessor.AddPhoto(request.photo);
            if (photoResult == null) return Error.NotFound(code: "PhotoFileWsNotFound", description: "Requested photo was not found");


        }
    }
}
