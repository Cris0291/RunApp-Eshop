namespace RunApp.Domain.CustomerProfileAggregate.ProductStatuses
{
    public class ProductStatus
    {
        internal ProductStatus() { }
   
        public bool? Like { get; internal set; }
        public bool? Dislike { get; internal set; }
        public bool? Viewed { get; internal set; }
        public bool? Bought { get; internal set; }
        public Guid Id { get; internal set; }
        public Guid ProductId { get; internal set; }
    }
}
