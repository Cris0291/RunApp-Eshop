using ErrorOr;
using RunnApp.Application.Common.SortingPagingFiltering;

namespace RunApp.Api.CustomValidators
{
    public static class SortingAndFilteringEnumValidator
    {
        public static ErrorOr<(OrderByOptions, FilterByOptions)> ConverToEnum(this string sortingValueAndType, string filterType)
        {
            List<Error> errors = new();

            if (!Enum.TryParse(sortingValueAndType, out OrderByOptions orderBy)) errors.Add(Error.Validation(code: "SortingValueDidNotMatchSortingOptions", description: "Sorting value did not match sorting options"));
            if (!Enum.TryParse(filterType, out FilterByOptions filterBy)) errors.Add(Error.Validation(code: "FilterValuDidNotMathFilterOptions", description: "Filter value did not match filtering options"));
            if (errors.Count > 0) return errors;

            return (orderBy, filterBy);
        }
    }
}
