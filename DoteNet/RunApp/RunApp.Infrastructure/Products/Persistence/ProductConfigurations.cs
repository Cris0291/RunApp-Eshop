using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunApp.Domain.Products;

namespace RunApp.Infrastructure.Products.Persistence
{
    public class ProductConfigurations : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.OwnsMany(product => product.BulletPoints)
                .ToTable("Bulletpoints");

            builder.Property(p => p.Discount).HasComputedColumnSql("100 * (1-[PriceWithDiscount]/[ActualPrice])", stored:true);

            builder.Property(p => p.Reviews).HasField("_reviews");

            builder.HasMany(p => p.Reviews)
                .WithOne()
                .HasForeignKey(r =>r.ProductId);

        }
    }
}
