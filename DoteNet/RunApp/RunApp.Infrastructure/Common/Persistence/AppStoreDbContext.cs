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
using RunApp.Domain.CustomerProfileAggregate;
using RunApp.Infrastructure.Sales.Persistence;
using RunApp.Infrastructure.Stocks.Persistence;
using RunApp.Infrastructure.StoreOwnerProfiles.Persistence;
using RunApp.Domain.StoreOwnerProfileAggregate;

namespace RunApp.Infrastructure.Common.Persistence
{
    public class AppStoreDbContext : IdentityDbContext<AppUser,AppRole, Guid>, IUnitOfWorkPattern
    {
       
        public DbSet<Product> Products => Set<Product>();
        public DbSet<CustomerProfile> CustomerProfiles => Set<CustomerProfile>();
        public DbSet<StoreOwnerProfile> StoreOwnerProfiles => Set<StoreOwnerProfile>();
        public AppStoreDbContext(DbContextOptions<AppStoreDbContext> options) : base(options) { }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             ;
            modelBuilder.ApplyConfiguration(new ProductConfigurations());
            modelBuilder.ApplyConfiguration(new ReviewConfiguration());
            modelBuilder.ApplyConfiguration(new CustomerProfileConfiguration());
            modelBuilder.ApplyConfiguration(new ProductStatusConfiguration());
            modelBuilder.ApplyConfiguration(new SalesConfiguration());
            modelBuilder.ApplyConfiguration(new StockConfiguration());
            modelBuilder.ApplyConfiguration(new StoreOwnerProfileConfiguration());
            base.OnModelCreating(modelBuilder);
        }

        public async Task<int> CommitChangesAsync()
        {
           return await base.SaveChangesAsync();
        }
    }
}
