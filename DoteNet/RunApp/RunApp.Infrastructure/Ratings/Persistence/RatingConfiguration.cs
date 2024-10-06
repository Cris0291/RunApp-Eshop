using Microsoft.EntityFrameworkCore;
using RunApp.Domain.CustomerProfileAggregate;
using RunApp.Domain.Products;
using RunApp.Domain.RatingAggregate;

namespace RunApp.Infrastructure.Ratings.Persistence
{
    public class RatingConfiguration : IEntityTypeConfiguration<Rating>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Rating> builder)
        {
            builder.Property(x => x.NumOfStars)
                .HasColumnType("decimal")
                .HasPrecision(2,1);

            builder.Property(x => x.DateOfRate)
                .HasDefaultValueSql("getutcdate()");

            builder.HasOne<Product>()
                .WithMany()
                .HasForeignKey(x => x.ProductId);

            builder.HasOne<CustomerProfile>()
                .WithMany()
                .HasForeignKey(x => x.Id);

            builder.HasKey(x => new { x.ProductId, x.Id});

            builder.HasAlternateKey(x => x.RatingId);
        }
    }
}
