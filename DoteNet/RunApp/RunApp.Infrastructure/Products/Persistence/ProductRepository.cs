using Microsoft.EntityFrameworkCore;
using RunApp.Domain.Products;
using RunApp.Infrastructure.Common.Persistence;
using RunnApp.Application.Common.Interfaces;
using RunnApp.Application.CustomerProfiles.Common;
using RunnApp.Application.Products.Queries.GetProducts;

namespace RunApp.Infrastructure.Products.Persistence
{
    public class ProductRepository : IProductsRepository
    {
        private readonly AppStoreDbContext _appDbContext;

        public ProductRepository(AppStoreDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task CreateProduct(Product product)
        {
           await _appDbContext.AddAsync(product);
        }

        public async Task DeleteProduct(Guid id)
        {
            Product product = await _appDbContext.Products
                .SingleAsync(p => p.ProductId == id);

             _appDbContext.Products.Remove(product);
        }

        public async Task<bool> ExistProduct(Guid id)
        {
             return await _appDbContext.Products.AnyAsync(p => p.ProductId == id);
        }

        public async Task<Product?> GetProduct(Guid id)
        {
            Product? requiredProduct = await _appDbContext.Products.SingleOrDefaultAsync(product => product.ProductId == id);
            return requiredProduct;
        }

        public async Task<Product> GetProductWithNoDefault(Guid id)
        {
            Product requiredProduct = await _appDbContext.Products.SingleAsync(product => product.ProductId == id);
            return requiredProduct;
        }
        public async Task<IEnumerable<ProductForCard>> GetProducts(Guid userId)
        {
            return await _appDbContext.Products.Select(x => new ProductForCard
            {
                ProductId = x.ProductId,
                Name  = x.Name,
                ActualPrice = x.ActualPrice,
                NumberOfReviews = x.NumberOfReviews,
                AverageRatings = x.AverageRatings,
                PriceWithDiscount = x.PriceOffer.PriceWithDiscount,
                PromotionalText = x.PriceOffer.PromotionalText,
                Discount = x.PriceOffer.Discount,
                Statuses = x.Statuses.Where(x => x == userId).ToList(),
                ProductStatus = null
            }).ToListAsync();
        }
        public async Task<List<ProductDto>> GetBoughtProducts(List<Guid> boughtProducts)
        {
            var boughtProductsSet = boughtProducts.ToHashSet();

            return await _appDbContext.Products.Where(x => boughtProductsSet.Contains(x.ProductId)).Select(x => new ProductDto(x.ProductId, x.Name)).ToListAsync();
        }
       
    }
}
