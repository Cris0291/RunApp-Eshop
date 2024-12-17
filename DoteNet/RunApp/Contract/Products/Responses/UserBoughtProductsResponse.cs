namespace Contracts.Products.Responses
{
    public record UserBoughtProductsResponse(Guid ProductId, string? ProductImage, decimal ProductPrice, string Name, string Category);
}
