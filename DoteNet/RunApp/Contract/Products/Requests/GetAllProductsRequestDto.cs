namespace Contracts.Products.Requests
{
    public record GetAllProductsRequestDto(string SortingType, int filterByLikes, int filterByStars, string[] Categories, int[] PriceRange, string search);
}
