
using RunApp.Domain.Products;

namespace RunnApp.Application.Common.Interfaces
{
    public interface IProductsRepository
    {
        Task<Product?> GetProduct(Guid id);
        Task<IEnumerable<Product>> GetProducts();
        Task CreateProduct(Product product);
        Task DeleteProduct(Guid id);
        Task UpdateProduct(Product product);
    }
}
