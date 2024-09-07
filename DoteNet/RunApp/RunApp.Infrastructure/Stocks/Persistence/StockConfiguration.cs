using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunApp.Domain.StoreOwnerProfileAggregate.Stocks;

namespace RunApp.Infrastructure.Stocks.Persistence
{
    public class StockConfiguration : IEntityTypeConfiguration<Stock>
    {
        public void Configure(EntityTypeBuilder<Stock> builder)
        {
            builder.Property(x => x.StockAddedDate)
                .HasComputedColumnSql(@"case when [AddedStock] is not null then [StockDate]
                                              else null end", stored: true);

            builder.Property(x => x.StockRemoveDate)
                .HasComputedColumnSql(@"case when [SoldStock] is not null then [StockDate]
                                              else null end", stored: true);

            builder.Property(x => x.StockDate)
                .HasDefaultValueSql("getutcdate()");
        }
    }
}
