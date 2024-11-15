namespace Contracts.CustomerProfile.Response
{
    public record UserInfoResponse(string Name, string Email, string NickName, AddressResponse? AddressResponse, CardResponse? CardResponse);
}
