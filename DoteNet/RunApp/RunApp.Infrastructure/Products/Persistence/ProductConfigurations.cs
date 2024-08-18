using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunApp.Domain.CustomerProfileAggregate.ProductStatuses;
using RunApp.Domain.Products;

namespace RunApp.Infrastructure.Products.Persistence
{
    public class ProductConfigurations : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.OwnsMany(product => product.BulletPoints)
                .ToTable("Bulletpoints");

            builder.OwnsOne(p => p.PriceOffer, pO => pO.Property(x => x.Discount).HasComputedColumnSql("100 * (1-[PriceWithDiscount]/[ActualPrice])", stored: true)
                 .HasColumnType("decimal(5,2)").HasColumnName("Discount"));

            builder.OwnsOne(p => p.PriceOffer, px => px.Property(x => x.PriceWithDiscount).HasColumnType("decimal(10,2)").HasColumnName("PriceWithDiscount"));
            builder.OwnsOne(p => p.PriceOffer, px => px.Property(x => x.PromotionalText).HasColumnName("PromotionalText"));

            builder.Property(p => p.ActualPrice)
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
