using RunApp.Domain.ProductAggregate.ValueType;
using RunApp.Domain.ProductAggregate.Reviews;
using RunApp.Domain.Products;
using RunApp.Domain.ProductAggregate.ValueTypes;


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
            PriceOffer priceType = new PriceOffer { PriceWithDiscount = priceWithDiscount ?? Constants.Product.PriceWithDiscount, PromotionalText = promotionalText ?? Constants.Product.PromotioanlText, Discount = discount ?? Constants.Product.Discount };
            
            return new Product( productId: id ?? Constants.Product.ProductId,
               name: name ?? Constants.Product.Name,
               description: description ?? Constants.Product.Description,
               actualPrice: price ?? Constants.Product.Price,
               bulletpoints: bullPoints,
               priceOffer: priceType,
               reviews: reviews ?? Constants.Product.Reviews
                );
        }
    }
}
