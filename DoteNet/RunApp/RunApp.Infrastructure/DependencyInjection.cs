using Microsoft.Extensions.DependencyInjection;
using RunnApp.Application.Common.Interfaces;
using RunApp.Infrastructure.Products.Persistence;
using RunApp.Infrastructure.Common.Persistence;
using Microsoft.EntityFrameworkCore;

namespace RunApp.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<IProductsRepository, ProductRepository>();
            services.AddDbContext<AppStoreDbContext>(options => options.UseSqlServer());

            return services;
        }
    }
}
