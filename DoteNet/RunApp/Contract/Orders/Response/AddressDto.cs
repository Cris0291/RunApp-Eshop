namespace Contracts.Orders.Response
{
    public record AddressDto(string ZipCode, string Street, string City, int HouseNumber, string Country, string? AlternativeStreet, int? AlternativeHouseNumber);
}
