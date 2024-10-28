using FluentValidation;
using RunnApp.Application.Common.SortingPagingFiltering;

namespace RunnApp.Application.Products.Queries.GetProducts
{
    public class GetProductsQueryValidator : AbstractValidator<GetProductsQuery>
    {
        public GetProductsQueryValidator()
        {
            RuleFor(x => x.search).NotEmpty().NotNull();
            RuleFor(x => x.filterByLikes).GreaterThan(0);
            RuleFor(x => x.filterByStars).GreaterThan(0);
        }
    }
}
