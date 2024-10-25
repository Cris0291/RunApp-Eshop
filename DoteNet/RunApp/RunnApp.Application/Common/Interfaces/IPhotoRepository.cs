﻿using RunApp.Domain.PhotoAggregate;

namespace RunnApp.Application.Common.Interfaces
{
    public interface IPhotoRepository
    {
        Task AddPhoto(Photo photo);
    }
}
