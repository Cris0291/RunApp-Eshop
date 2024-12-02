namespace Contracts.Common
{
    public record CardRequest(string CardName, string CardNumber, string CVV, DateTime ExpiryDate);
    
}
