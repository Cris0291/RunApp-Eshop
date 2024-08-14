using Microsoft.AspNetCore.Identity;

namespace RunApp.Domain.UserAggregate
{
    public class AppUser : IdentityUser<Guid>
    {
        public string NickName { get; set; }
    }
}
