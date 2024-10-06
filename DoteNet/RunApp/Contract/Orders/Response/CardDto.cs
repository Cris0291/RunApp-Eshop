namespace Contracts.Orders.Response
{
    public record CardDto(string HoldersName, string CardNumber, string CVV, DateTime ExpityDate);
}
