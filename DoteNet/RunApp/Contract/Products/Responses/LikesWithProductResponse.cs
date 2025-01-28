namespace Contracts.Products.Responses
{
    public record LikesWithProductResponse(Guid? ProductId, string? ProductName, decimal? ProdcutPrice, Guid LikeId, bool? Like);
}
