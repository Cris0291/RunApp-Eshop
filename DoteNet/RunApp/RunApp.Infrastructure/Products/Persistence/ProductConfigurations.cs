using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunApp.Domain.ProductAggregate.AboutValueType;
using RunApp.Domain.Products;

namespace RunApp.Infrastructure.Products.Persistence
{
    public class ProductConfigurations : IEntityTypeConfiguration<Product>
    {
       

        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.OwnsMany(product => product.BulletPoints)
                .ToTable("Bulletpoints");



            builder.Property(p => p.Discount).HasComputedColumnSql("100 * (1-[PriceWithDiscount]/[ActualPrice])", stored: true)
                 .HasColumnType("decimal(5,2)");


            builder.HasMany(p => p.Reviews)
                .WithOne()
                .HasForeignKey(r => r.ProductId);

            builder.Property(p => p.ActualPrice)
                .HasColumnType("decimal(10,2)");


            builder.Property(p => p.PriceWithDiscount)
                .HasColumnType("decimal(10,2)");
            

           /* builder.HasData(new Product()
            {
                ProductId = Guid.NewGuid(),
                Name = "Xbox",
                PriceWithDiscount = 275.75m,
                ActualPrice = 500m,
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                PromotionalText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae enim dolor. Nunc in nibh lectus. Cvestibulum id augue. Sed luctus convar. Sed interdum non quam quis eleifend",
            },
            new Product()
            {
                ProductId = Guid.NewGuid(),
                Name = "PlayStation",
                ActualPrice = 500m,
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                PromotionalText = "",
            }
            );*/
        }
    }
}
