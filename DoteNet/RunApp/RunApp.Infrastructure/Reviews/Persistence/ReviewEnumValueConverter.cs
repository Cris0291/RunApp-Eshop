using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RunApp.Domain.ProductAggregate.Reviews.Common;

namespace RunApp.Infrastructure.Reviews.Persistence
{
    public class ReviewEnumValueConverter : ValueConverter<ReviewDescriptionEnums, string>
    {
        public ReviewEnumValueConverter() : base
            (
            reviewEnum => reviewEnum.Name,
            Name => ReviewDescriptionEnums.FromName(Name, false)
            ) { }
    }
}
