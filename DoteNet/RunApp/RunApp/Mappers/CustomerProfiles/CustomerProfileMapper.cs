using Contracts.CustomerProfile.Response;
using RunApp.Domain.Common.ValueType;
using RunApp.Domain.CustomerProfileAggregate;

namespace RunApp.Api.Mappers.CustomerProfiles
{
    public static class CustomerProfileMapper
    {
        public static AddressResponse FromAddressToAddressResponse(this Address addressRequest)
        {
            return new AddressResponse(addressRequest.ZipCode, addressRequest.Street, addressRequest.City, addressRequest.HouseNumber, addressRequest.Country, addressRequest.State);
        }
        public static AccountInfoResponse FromCustomerToAccountResponse(this CustomerProfile customerProfile)
        {
            return new AccountInfoResponse(customerProfile.Name, customerProfile.Email, customerProfile.NickName);
        }
        public static UserInfoResponse FromCustomerToUserInfo(this CustomerProfile customerProfile)
        {
            return new UserInfoResponse(customerProfile.Name, customerProfile.Email, customerProfile.NickName, customerProfile.ShippingAdress?.FromAddressToAddressResponse(), customerProfile.PaymentMethod?.FromCardToCardResponse());
        }
        public static CardResponse FromCardToCardResponse(this Card card)
        {
            return new CardResponse(card.HoldersName, card.CardNumber, card.CVV, card.ExpiryDate);
        }
    }
}
