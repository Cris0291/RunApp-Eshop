using Microsoft.Extensions.DependencyInjection;
using RunnApp.Application.Common.Interfaces;
using RunApp.Infrastructure.Products.Persistence;
using RunApp.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RunApp.Infrastructure.Reviews.Persistence;

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
            

            return services;
        }
    }
}
