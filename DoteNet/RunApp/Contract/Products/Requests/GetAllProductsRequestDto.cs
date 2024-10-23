namespace Contracts.Products.Requests
{
    public record GetAllProductsRequestDto(string SortingValueAndType, string filterValue, string filterType,int PageSize, int pageNumZeroBased);
}
