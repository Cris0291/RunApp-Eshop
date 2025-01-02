using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunApp.Domain.OrderAggregate;
using RunApp.Domain.OrderAggregate.LineItems;
using RunApp.Domain.Products;

namespace RunApp.Infrastructure.LineItems.Persistence
{
    public class LineItemsConfiguration : IEntityTypeConfiguration<LineItem>
    {
        public void Configure(EntityTypeBuilder<LineItem> builder)
        {
            builder.HasOne<Product>()
                .WithMany()
                .HasForeignKey(x => x.ProductId);

            builder.HasOne<Order>()
                .WithMany()
                .HasForeignKey(x => x.OrderId);

            builder.HasKey(x => new {x.ProductId, x.OrderId});

            builder.Property(x => x.PriceWithDiscount)
                .HasColumnType("decimal(10,2)");

            builder.Property(x => x.TotalItemPrice)
                .HasColumnType("decimal(10,2)");

            builder.Property(x => x.Price)
                .HasColumnType("decimal(10,2)");

            builder.HasAlternateKey(x => x.LineItemID);

            builder.HasIndex(x => x.LineItemID);
        }
    }
}
