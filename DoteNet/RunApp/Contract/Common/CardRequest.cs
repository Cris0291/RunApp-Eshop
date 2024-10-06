namespace Contracts.Common
{
    public record CardRequest(string HoldersName, string CardNumber, string CVV, DateTime ExpiryDate);
    
}
