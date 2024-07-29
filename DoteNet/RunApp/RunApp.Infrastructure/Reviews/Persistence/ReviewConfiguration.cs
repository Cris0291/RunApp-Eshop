using Microsoft.EntityFrameworkCore;
using RunApp.Domain.ProductAggregate.Reviews;

namespace RunApp.Infrastructure.Reviews.Persistence
{
    public class ReviewConfiguration : IEntityTypeConfiguration<Review>
    {
        
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Review> builder)
        {
            builder.Property(r => r.Date)
                .HasDefaultValueSql("getutcdate()");

            builder.Property(r => r.ReviewDescription)
                .HasConversion<string>();

            builder.Property(r => r.NumOfStars)
                 .HasPrecision(2,1);

            builder.Property(r => r.ReviewDescription)
                 .HasConversion<ReviewEnumValueConverter>();
        }
    }
}
