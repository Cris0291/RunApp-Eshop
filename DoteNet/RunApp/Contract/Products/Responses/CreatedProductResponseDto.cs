namespace Contracts.Products.Responses
{
    public record CreatedProductResponseDto(Guid Id, string? Image, decimal Price, string Name, decimal? DiscountedPrice, string[] Category);
}
