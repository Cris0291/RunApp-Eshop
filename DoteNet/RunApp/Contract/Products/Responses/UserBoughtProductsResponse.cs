namespace Contracts.Products.Responses
{
    public record UserBoughtProductsResponse(Guid ProductId, string Image, decimal ActualPrice, string Name);
}
