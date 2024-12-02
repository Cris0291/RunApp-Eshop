namespace Contracts.Orders.Response
{
    public record CardDto(string cardName, string CardNumber, string CVV, DateTime ExpiryDate);
}
