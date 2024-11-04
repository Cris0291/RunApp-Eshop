namespace RunnApp.Application.Products.Queries.GetProducts
{
    public record FilterMappingValues(int FilterByLikes, int[] FilterByStars, string[] Categories, int[] PriceRange, string Search);
}
