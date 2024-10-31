using RunApp.Domain.Products;
using RunnApp.Application.Common.SortingPagingFiltering;

namespace RunnApp.Application.Products.Queries.GetProducts
{
    public static class QueryBuilder
    {
        public static IQueryable<ProductForCard> TransformQuery(this IQueryable<Product> productsWithStatus)
        {
            return productsWithStatus.Select(x => new ProductForCard
            {
                ProductId = x.ProductId,
                Name = x.Name,
                ActualPrice = x.ActualPrice,
                NumberOfReviews = x.NumberOfReviews,
                AverageRatings = x.AverageRatings,
                PriceWithDiscount = x.PriceOffer == null ? null : x.PriceOffer.PriceWithDiscount,
                PromotionalText = x.PriceOffer == null ? null : x.PriceOffer.PromotionalText,
                Discount = x.PriceOffer == null ? null : x.PriceOffer.Discount,
                TagNames = x.Tags.Select(x => x.TagName)
            });
        }
        public static IQueryable<ProductForCard> AddSortingBy(this IQueryable<ProductForCard> products, OrderByOptions orderByOptions)
        {
            switch (orderByOptions)
            {
                case OrderByOptions.SimpleOrder:
                    return products.OrderByDescending(x => x.ProductId);
                case OrderByOptions.PriceDescendingOrder:
                    return products.OrderByDescending(x => x.ActualPrice);
                case OrderByOptions.PriceAscendingOrder:
                    return products.OrderBy(x => x.ActualPrice);
                case OrderByOptions.AverageRatingAscendingOrder:
                    return products.OrderBy(x => x.AverageRatings);
                case OrderByOptions.AverageRatingDescendingOrder:
                    return products.OrderByDescending(x => x.AverageRatings);
                default:
                    return products.OrderByDescending(x => x.ProductId);
            }
        }
        public static IQueryable<ProductForCard> AddFiltering(this IQueryable<ProductForCard> products, FilterMappingValues filterValues, IEnumerable<FilterByOptions> options)
        {
            IQueryable<ProductForCard> newProducts = products;

            foreach (var option in options)
            {
                switch (option)
                {
                    case FilterByOptions.Likes:
                        return products;
                    case FilterByOptions.Categories:
                        var value = int.Parse(filterValue);
                        return products.Where(x => Math.Round(x.AverageRatings) >= value);
                    case FilterByOptions.Search:
                        newProducts =  newProducts.Where(x => x.Name.Contains(filterValues.Search));
                        break;
                    case FilterByOptions.PriceRange:
                        newProducts = newProducts.Where(x => x.ActualPrice >= filterValues.PriceRange[0] && x <= filterValues.PriceRange[1]);
                        break;
                    case FilterByOptions.Stars:
                        newProducts = newProducts.Where(x => Math.Round(x.AverageRatings) >= filterValues.FilterByStars);
                        break;
                    default:
                        return products;
                }
            }
        }
        public static IQueryable<T> AddPaging<T>(this IQueryable<T> query, int pageSize, int pageNumZeroStart)
        {
            if (pageNumZeroStart != 0) query.Skip(pageNumZeroStart * pageSize);
            return query.Take(pageSize);
        }
    }
}
