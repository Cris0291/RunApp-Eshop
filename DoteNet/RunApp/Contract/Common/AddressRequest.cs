namespace Contracts.Common
{
    public record AddressRequest(string ZipCode, string Street, string City, int BuildingNumber, string Country, string? AlternativeStreet = null, int? AlternativeBuildingNumber = null);
    
}
