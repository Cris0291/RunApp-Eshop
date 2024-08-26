using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunApp.Domain.StoreOwnerProfileAggregate;

namespace RunApp.Infrastructure.StoreOwnerProfiles.Persistence
{
    public class StoreOwnerProfileConfiguration : IEntityTypeConfiguration<StoreOwnerProfile>
    {
        public void Configure(EntityTypeBuilder<StoreOwnerProfile> builder)
        {
            builder.HasMany(x => x.Sales)
                 .WithOne()
                 .HasForeignKey(y => y.StoreOwnerProfileId);

            builder.HasMany(x => x.Stocks)
                .WithOne()
                .HasForeignKey(y => y.StoreOwnerProfileId);

            builder.Property(x => x.TotalSalesInCash).HasPrecision(10, 2);
        }
    }
}
