using RunApp.Domain.Products;
using RunnApp.Application.Common.SortingPagingFiltering;
using System.Linq;

namespace RunnApp.Application.Products.Queries.GetProducts
{
    public static class QueryBuilder
    {
        public static IQueryable<ProductForCard> TransformProductWithImageQuery(this IQueryable<ProductWithMainImage> productsWithImage)
        {
            return productsWithImage.Select(x => new ProductForCard
            {
                ProductId = x.Product.ProductId,
                Name = x.Product.Name,
                ActualPrice = x.Product.ActualPrice,
                NumberOfReviews = x.Product.NumberOfReviews,
                NumberOflikes = x.Product.NumberOfLikes,
                AverageRatings = x.Product.AverageRatings,
                PriceWithDiscount = x.Product.PriceOffer == null ? null : x.Product.PriceOffer.PriceWithDiscount,
                PromotionalText = x.Product.PriceOffer == null ? null : x.Product.PriceOffer.PromotionalText,
                Discount = x.Product.PriceOffer == null ? null : x.Product.PriceOffer.Discount,
                CategoryNames = x.Product.Categories.Select(x => x.CategoryName),
                MainImage = x.MainImage.Url,
                UserLike = null,
            }); ; ;
        }
        public static IQueryable<ProductsJoin> AddSortingBy(this IQueryable<ProductsJoin> products, OrderByOptions orderByOptions)
        {
            switch (orderByOptions)
            {
                case OrderByOptions.SimpleOrder:
                    return products.OrderByDescending(x => x.Product.ProductId);
                case OrderByOptions.PriceDescendingOrder:
                    return products.OrderByDescending(x => x.Product.ActualPrice);
                case OrderByOptions.PriceAscendingOrder:
                    return products.OrderBy(x => x.Product.ActualPrice);
                case OrderByOptions.AverageRatingAscendingOrder:
                    return products.OrderBy(x => x.Product.AverageRatings);
                case OrderByOptions.AverageRatingDescendingOrder:
                    return products.OrderByDescending(x => x.Product.AverageRatings);
                default:
                    return products.OrderByDescending(x => x.Product.ProductId);
            }
        }
        public static IQueryable<ProductsJoin> AddFiltering(this IQueryable<ProductsJoin> products, FilterMappingValues filterValues, IEnumerable<FilterByOptions> options)
        {
            IQueryable<ProductsJoin> newProducts = products;
            var categoriesSet = filterValues.Categories.ToHashSet();
            var starsSet = filterValues.FilterByStars.ToHashSet();

            foreach (var option in options)
            {
                switch (option)
                {
                    case FilterByOptions.Likes:
                        newProducts = newProducts.Where(x => x.Product.NumberOflikes >= filterValues.FilterByLikes);
                        break;
                    case FilterByOptions.Categories:
                        newProducts = newProducts.Where(x => x.Product.CategoryNames.Any(c => categoriesSet.Contains(c)));
                        break;
                    case FilterByOptions.Search:
                        newProducts = filterValues.Search == "all" ? newProducts : newProducts = newProducts.Where(x => x.Product.Name.Contains(filterValues.Search));
                        break;
                    case FilterByOptions.PriceRange:
                        newProducts = newProducts.Where(x => x.Product.ActualPrice >= filterValues.PriceRange[0] && x.Product.ActualPrice <= filterValues.PriceRange[1]);
                        break;
                    case FilterByOptions.Stars:
                        newProducts = newProducts.Where(x => starsSet.Contains((int)Math.Round(x.Product.AverageRatings)));
                        break;
                    default:
                        return products;
                }
            }

            return newProducts;
        }
        public static IQueryable<T> AddPaging<T>(this IQueryable<T> query, int pageSize, int pageNumZeroStart)
        {
            if (pageNumZeroStart != 0) query.Skip(pageNumZeroStart * pageSize);
            return query.Take(pageSize);
        }
    }
}
