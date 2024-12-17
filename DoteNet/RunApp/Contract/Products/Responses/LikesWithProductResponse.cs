namespace Contracts.Products.Responses
{
    public record LikesWithProductResponse(Guid? ProductId, string? ProductName, string? ProductImage, decimal? ProdcutPrice, Guid LikeId, bool? Like);
}
