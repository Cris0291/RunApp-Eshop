using RunApp.Domain.PhotoAggregate;
using RunApp.Infrastructure.Common.Persistence;
using RunnApp.Application.Common.Interfaces;

namespace RunApp.Infrastructure.Photos.Persistence
{
    public class PhotoRepository(AppStoreDbContext appStoreDbContext) : IPhotoRepository
    {
        private readonly AppStoreDbContext _appStoreDbContext = appStoreDbContext;

        public async Task AddPhoto(Photo photo)
        {
            await _appStoreDbContext.AddAsync(photo);
        }
    }
}
