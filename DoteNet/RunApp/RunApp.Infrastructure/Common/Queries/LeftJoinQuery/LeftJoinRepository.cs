using Microsoft.EntityFrameworkCore;
using RunApp.Domain.Products;
using RunApp.Domain.ProductStatusAggregate;
using RunApp.Infrastructure.Common.Persistence;
using RunnApp.Application.Common.Interfaces;
using RunnApp.Application.CustomerProfiles.Queries.GetUserLikes;
using System.Linq.Expressions;


namespace RunApp.Infrastructure.Common.Queries.LeftJoinQuery
{
    public class LeftJoinRepository(AppStoreDbContext appStoreDbContext) :ILeftJoinRepository
    {
        private readonly AppStoreDbContext _appStoreDbContext = appStoreDbContext;
        public async Task<List<ProductUserLikesDto>> GetUserLikes(Guid UserId)
        {
            IQueryable<ProductStatus> productStatus = _appStoreDbContext.ProductStatuses.Where(x => x.Id == UserId);
            IQueryable<Product> products = _appStoreDbContext.Products;
            Expression<Func<ProductStatus, Guid>> outerKey = (productStatus) => productStatus.ProductId.Value;
            Expression<Func<Product, Guid>> innerKey = (product) => product.ProductId;
            Expression<Func<ProductStatus, Product?, ProductUserLikesDto>> resultSelector = (productStatus, product) => new ProductUserLikesDto { Product = product, ProductStatus = productStatus };

            var userLikes = productStatus.CreateOuterJoinQuery(products, outerKey, innerKey, resultSelector);
            return await userLikes.ToListAsync();
        }
    }
}
