namespace RunApp.Domain.Common.ValueType
{
    public class Address
    {
        internal Address() { }
        public string ZipCode { get; internal set; }
        public string Street { get; internal set; }
        public string City { get; internal set; }
        public int HouseNumber { get; internal set; }
        public string Country { get; internal set; }
        public string State { get; internal set; }
        public string? AlternativeStreet { get; internal set; }
        public int? AlternativeHouseNumber { get; internal set; }

    }
}
