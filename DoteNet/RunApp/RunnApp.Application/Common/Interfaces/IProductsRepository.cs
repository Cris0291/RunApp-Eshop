using RunApp.Domain.Products;
using RunnApp.Application.CustomerProfiles.Common;
using RunnApp.Application.Products.Queries.GetProducts;

namespace RunnApp.Application.Common.Interfaces
{
    public interface IProductsRepository
    {
        Task<Product?> GetProduct(Guid id);
        Task<IEnumerable<ProductForCard>> GetProducts(Guid userId);
        Task CreateProduct(Product product);
        Task DeleteProduct(Guid id);
        Task<bool> ExistProduct(Guid id);
        Task<Product> GetProductWithNoDefault(Guid id);
        Task<List<ProductDto>> GetBoughtProducts(List<Guid> boughtProducts);
    }
}
