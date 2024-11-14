namespace Contracts.CustomerProfile.Response
{
    public record AddressResponse(string ZipCode, string Street, string City, int HouseNumber, string Country, string State);
}
