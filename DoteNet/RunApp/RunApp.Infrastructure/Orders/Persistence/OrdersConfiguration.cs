using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunApp.Domain.OrderAggregate;

namespace RunApp.Infrastructure.Orders.Persistence
{
    internal class OrdersConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.Property(x => x.TotalPrice)
                .HasColumnType("decimal(10,2)");

            builder.OwnsOne(x => x.Address, px =>
            {
                px.Property(y => y.AlternativeStreet).IsRequired(false);
                px.Property(y => y.AlternativeHouseNumber).IsRequired(false);
            });
            builder.OwnsOne(x => x.PaymentMethod);

            builder.Property(x => x.DateOfPayment)
                .HasDefaultValueSql("getutcdate()");

            builder.Property(x => x.TotalPrice)
                .HasComputedColumnSql(@"select sum(coalesce([PriceWithDiscount], [Price])) from [LineItems]", stored: true);
        }
    }
}
