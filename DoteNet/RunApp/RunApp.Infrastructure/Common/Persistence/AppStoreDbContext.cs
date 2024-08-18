using Microsoft.EntityFrameworkCore;
using  RunApp.Domain.Products;
using RunApp.Infrastructure.Products.Persistence;
using RunApp.Infrastructure.Reviews.Persistence;
using RunnApp.Application.Common.Interfaces;
using RunApp.Domain.UserAggregate;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using RunApp.Domain.UserAggregate.Roles;
using RunApp.Infrastructure.CustomerProfiles.Persistence;
using RunApp.Infrastructure.ProductStatuses.Persistence;

namespace RunApp.Infrastructure.Common.Persistence
{
    public class AppStoreDbContext : IdentityDbContext<AppUser,AppRole, Guid>, IUnitOfWorkPattern
    {
       
        public DbSet<Product> Products => Set<Product>();
        public AppStoreDbContext(DbContextOptions<AppStoreDbContext> options) : base(options) { }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             ;
            modelBuilder.ApplyConfiguration(new ProductConfigurations());
            modelBuilder.ApplyConfiguration(new ReviewConfiguration());
            modelBuilder.ApplyConfiguration(new CustomerProfileConfiguration());
            modelBuilder.ApplyConfiguration(new ProductStatusConfiguration());
            base.OnModelCreating(modelBuilder);
        }

        public async Task<int> CommitChangesAsync()
        {
           return await base.SaveChangesAsync();
        }
    }
}
