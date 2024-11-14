namespace RunApp.Domain.Common.ValueType
{
    public class Card
    {
        internal Card() { }
        public string HoldersName { get; internal set; }
        public string CardNumber { get; internal set; }
        public string CVV { get; internal set; }
        public DateTime ExpiryDate { get; internal set; }
    }
}
