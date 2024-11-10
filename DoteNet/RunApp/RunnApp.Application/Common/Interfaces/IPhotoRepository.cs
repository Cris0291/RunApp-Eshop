using RunApp.Domain.PhotoAggregate;

namespace RunnApp.Application.Common.Interfaces
{
    public interface IPhotoRepository
    {
        Task AddPhoto(Photo photo);
        Task RemovePhoto(Photo photo);
        Task<Photo?> GetPhoto(string photoId);
        Task<IEnumerable<Photo>> GetPhotosForProduct(Guid productId);
    }
}
