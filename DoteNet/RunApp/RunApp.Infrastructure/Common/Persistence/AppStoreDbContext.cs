using Microsoft.EntityFrameworkCore;
using  RunApp.Domain.Products;

namespace RunApp.Infrastructure.Common.Persistence
{
    public class AppStoreDbContext : DbContext
    {
        public DbSet<Product> Products => Set<Product>();
        public AppStoreDbContext(DbContextOptions<AppStoreDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
