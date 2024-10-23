using FluentValidation;
using RunnApp.Application.Common.SortingPagingFiltering;

namespace RunnApp.Application.Products.Queries.GetProducts
{
    public class GetProductsQueryValidator : AbstractValidator<GetProductsQuery>
    {
        public GetProductsQueryValidator()
        {
            RuleFor(x => x.PageSize).GreaterThan(0);
            RuleFor(x => x.PageNumZeroBased).GreaterThanOrEqualTo(0);
            RuleFor(x => x.FilterValue).Must(x => int.TryParse(x, out int result)).When(x => x.FilterByOptions == FilterByOptions.ByVotes);
        }
    }
}
