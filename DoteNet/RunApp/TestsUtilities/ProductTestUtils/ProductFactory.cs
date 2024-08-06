using ErrorOr;
using Microsoft.VisualBasic;
using RunApp.Domain.ProductAggregate.AboutValueType;
using RunApp.Domain.ProductAggregate.Reviews;
using RunApp.Domain.Products;
using System.Drawing;
using System.Reflection.Metadata;
using TestsUtilities.ProductTestUtils;

namespace TestsUtilities.ProductTestUtils
{
    public static class ProductFactory
    {
        public static Product CreateProduct(Guid? id = null, string? name = null, string? description = null, 
            decimal? price = null, ICollection<string>? bulletpoints = null, 
            decimal? priceWithDiscount = null, string? promotionalText = null, decimal? discount = null, List<Review>? reviews = null)
        {
            var points = bulletpoints ?? Constants.Product.BulletPoints;
            ICollection<About> bullPoints = points.Select(p => new About(p)).ToList();
            
            return new Product( productId: id ?? Constants.Product.ProductId,
               name: name ?? Constants.Product.Name,
               description: description ?? Constants.Product.Description,
               actualPrice: price ?? Constants.Product.Price,
               bulletpoints: bullPoints,
               priceWithDiscount: priceWithDiscount ?? Constants.Product.PriceWithDiscount,
               promotionalText: promotionalText ?? Constants.Product.PromotioanlText,
               discount: discount ?? Constants.Product.Discount,
               reviews: reviews ?? Constants.Product.Reviews
                );
        }
    }
}
