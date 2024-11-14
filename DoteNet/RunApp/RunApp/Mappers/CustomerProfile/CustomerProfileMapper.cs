using Contracts.CustomerProfile.Response;
using RunApp.Domain.Common.ValueType;

namespace RunApp.Api.Mappers.CustomerProfile
{
    public static class CustomerProfileMapper
    {
        public static AddressResponse FromAddressToAddressResponse(this Address addressRequest)
        {
            return new AddressResponse(addressRequest.ZipCode, addressRequest.Street, addressRequest.City, addressRequest.HouseNumber, addressRequest.Country, addressRequest.State);
        }
    }
}
