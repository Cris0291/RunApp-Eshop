using ErrorOr;
using Microsoft.EntityFrameworkCore;
using RunApp.Domain.Products;
using RunApp.Infrastructure.Common.Persistence;
using RunnApp.Application.Common.Interfaces;

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

        public Task DeleteProduct(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<Product?> GetProduct(Guid id)
        {
            Product? requiredProduct = await _appDbContext.Products.SingleOrDefaultAsync(product => product.ProductId == id);
            return requiredProduct;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _appDbContext.Products.ToListAsync();
        }

       
    }
}
