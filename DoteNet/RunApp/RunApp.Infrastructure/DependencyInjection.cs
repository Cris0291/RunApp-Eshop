using Microsoft.Extensions.DependencyInjection;
using RunnApp.Application.Common.Interfaces;
using RunApp.Infrastructure.Products.Persistence;
using RunApp.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;
using RunApp.Infrastructure.Reviews.Persistence;
using RunApp.Domain.UserAggregate;
using RunApp.Domain.UserAggregate.Roles;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using RunApp.Infrastructure.CustomerProfiles.Persistence;

namespace RunApp.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
        {
            services.AddScoped<IProductsRepository, ProductRepository>();
            services.AddDbContext<AppStoreDbContext>(options => options.UseSqlServer(connectionString));
            services.AddScoped<IUnitOfWorkPattern>(serviceProvider => serviceProvider.GetRequiredService<AppStoreDbContext>());
            services.AddScoped<IReviewsRepository, ReviewRepository>();
            services.AddScoped<ICustomerProfileRepository, CustomerProfileRepository>();

            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireDigit = true;
                opt.Password.RequireLowercase = true;
                opt.Password.RequireNonAlphanumeric = true;
                opt.Password.RequireUppercase = true;
                opt.Password.RequiredLength = 7;
                opt.Password.RequiredUniqueChars = 1;
            })
                .AddEntityFrameworkStores<AppStoreDbContext>()
                .AddRoles<AppRole>()
                .AddRoleStore<RoleStore<AppRole, AppStoreDbContext, Guid>>()
                .AddUserStore<UserStore<AppUser, AppRole, AppStoreDbContext, Guid>>();

            return services;
        }
    }
}
