namespace RunApp.Domain.CustomerProfileAggregate.ValueTypes
{
    public class Address
    {
        internal Address() { }
        public int? ZipCode { get; internal set; }
        public string? Street { get; internal set; }
        public string? City { get; internal set; }
        public int? HouseNumber { get; internal set; }
        public string? Country { get; internal set; }
        public string? AlternativeStreet { get; internal set; }
        public int? AlternativeHouseNumber { get; internal set; }

    }
}
