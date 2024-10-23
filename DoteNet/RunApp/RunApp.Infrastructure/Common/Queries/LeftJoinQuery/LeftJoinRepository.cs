using Microsoft.EntityFrameworkCore;
using RunApp.Domain.Products;
using RunApp.Domain.ProductStatusAggregate;
using RunApp.Infrastructure.Common.Persistence;
using RunnApp.Application.Common.Interfaces;
using RunnApp.Application.CustomerProfiles.Queries.GetUserLikes;
using RunnApp.Application.Products.Queries.GetProducts;
using System.Linq.Expressions;


namespace RunApp.Infrastructure.Common.Queries.LeftJoinQuery
{
    public class LeftJoinRepository(AppStoreDbContext appStoreDbContext) :ILeftJoinRepository
    {
        private readonly AppStoreDbContext _appStoreDbContext = appStoreDbContext;
        public IQueryable<ProductUserLikesDto> GetProductsAndStatusLeftJoin(Guid UserId)
        {
            IQueryable<ProductStatus> productStatus = _appStoreDbContext.ProductStatuses.Where(x => x.Id == UserId);
            IQueryable<Product> products = _appStoreDbContext.Products;
            Expression<Func<ProductStatus, Guid>> statusKey = (productStatus) => productStatus.ProductId.Value;
            Expression<Func<Product, Guid>> productKey = (product) => product.ProductId;
            Expression<Func<ProductStatus, Product?, ProductUserLikesDto>> resultSelector = (productStatus, product) => new ProductUserLikesDto { Product = product, ProductStatus = productStatus };


            return productStatus.CreateOuterJoinQuery(products, statusKey, productKey, resultSelector);
            
        }
        public IQueryable<ProductsJoin> GetProductsAndStatusLeftJoin(Guid UserId, IQueryable<ProductForCard> products)
        {
            IQueryable<ProductStatus> productStatus = _appStoreDbContext.ProductStatuses.Where(x => x.Id == UserId);
            Expression<Func<ProductForCard, Guid>> productKey = (product) => product.ProductId;
            Expression<Func<ProductStatus, Guid>> statusKey = (productStatus) => productStatus.ProductId.Value;
            Expression<Func<ProductForCard, ProductStatus?, ProductsJoin>> resultSelector = (productForCard, productStatus) => new ProductsJoin { Product = productForCard, ProductStatus = productStatus };

            return products.CreateOuterJoinQuery(productStatus, productKey, statusKey, resultSelector);
        }
        public async Task<List<T>> ExecuteQuery<T>(IQueryable<T> query)
        {
            return await query.ToListAsync();
        }
    }
}
