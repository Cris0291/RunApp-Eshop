using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RunApp.Domain.PhotoAggregate;
using RunApp.Domain.Products;
using RunApp.Domain.StoreOwnerProfileAggregate;

namespace RunApp.Infrastructure.Photos.Persistence
{
    public class PhotoConfiguration : IEntityTypeConfiguration<Photo>
    {
        public void Configure(EntityTypeBuilder<Photo> builder)
        {
            builder.HasOne<Product>()
                .WithMany()
                .HasForeignKey(x => x.ProductId);

            builder.HasOne<StoreOwnerProfile>()
                .WithMany()
                .HasForeignKey(x => x.StoreOwnerProfileId);
        }
    }
}
