﻿
namespace RunApp.Api.Services
{
    public static class UserIdService
    {
        public static Guid GetUserId(this HttpContext httpContext)
        {
            string userId = httpContext.User.Claims.Where(x => x.Type == "UserId").Select(x => x.Value).FirstOrDefault() ?? throw new InvalidOperationException("User id was not found");
            Guid id = Guid.TryParse(userId, out Guid Id) ? Id : throw new ArgumentException("User id was not a valid id");
            return id;
        }
    }
}
