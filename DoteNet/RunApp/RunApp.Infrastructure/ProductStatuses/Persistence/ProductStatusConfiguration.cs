using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunApp.Domain.CustomerProfileAggregate;
using RunApp.Domain.CustomerProfileAggregate.ProductStatuses;
using RunApp.Domain.Products;

namespace RunApp.Infrastructure.ProductStatuses.Persistence
{
    public class ProductStatusConfiguration : IEntityTypeConfiguration<ProductStatus>
    {
        public void Configure(EntityTypeBuilder<ProductStatus> builder)
        {
            builder.HasKey(x => new { x.Id, x.ProductId });

            builder.HasOne<CustomerProfile>()
                .WithMany(x => x.Statuses)
                .HasForeignKey(x => x.Id);

            builder.HasOne<Product>()
                .WithMany()
                .HasForeignKey(x => x.ProductId);
        }
    }
}
