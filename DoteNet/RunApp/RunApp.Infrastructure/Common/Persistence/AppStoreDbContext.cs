using Microsoft.EntityFrameworkCore;
using  RunApp.Domain.Products;
using RunApp.Infrastructure.Products.Persistence;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using RunApp.Infrastructure.Reviews.Persistence;
using RunnApp.Application.Common.Interfaces;

namespace RunApp.Infrastructure.Common.Persistence
{
    public class AppStoreDbContext : DbContext, IUnitOfWorkPattern
    {
        public DbSet<Product> Products => Set<Product>();
        public AppStoreDbContext(DbContextOptions<AppStoreDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ProductConfigurations());
            modelBuilder.ApplyConfiguration(new ReviewConfiguration());
        }

        public async Task<int> CommitChangesAsync()
        {
           return await base.SaveChangesAsync();
        }
    }
}
