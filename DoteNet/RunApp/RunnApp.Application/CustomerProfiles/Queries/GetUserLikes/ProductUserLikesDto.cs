using RunApp.Domain.ProductStatusAggregate;
using RunnApp.Application.Products.Queries.GetProducts;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserLikes
{
    public class ProductUserLikesDto
    {
        public ProductWithMainImage? Product { get; set; }
        public ProductStatus ProductStatus { get; set; }
    }
}
