namespace Contracts.StoreOwnerProfiles.Request
{
    public record StoreOwnerProfileRequest(string StoreName, int TotalProductsSold, decimal TotalSalesInCash, int TotalStock);
}
