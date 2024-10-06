using RunnApp.Application.CustomerProfiles.Queries.GetUserLikes;

namespace RunnApp.Application.Common.Interfaces
{
    public interface ILeftJoinRepository
    {
        Task<List<ProductUserLikesDto>> GetUserLikes(Guid UserId);
    }
}
