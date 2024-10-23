using RunApp.Domain.ProductAggregate.Tags;
using RunApp.Domain.Products;
using RunnApp.Application.CustomerProfiles.Common;

namespace RunnApp.Application.Common.Interfaces
{
    public interface IProductsRepository
    {
        Task<Product?> GetProduct(Guid id);
        IQueryable<Product> GetProducts();
        Task CreateProduct(Product product);
        Task DeleteProduct(Product product);
        Task<bool> ExistProduct(Guid id);
        Task<Product> GetProductWithNoDefault(Guid id);
        Task<List<ProductDto>> GetBoughtProducts(List<Guid> boughtProducts);
        Task<Product?> GetProductWithTags(Guid productId);
        Task<Product?> GetProductWithTags(Guid productId, Guid tagId);
        Task DeleteTag(Tag tag);
    }
}
