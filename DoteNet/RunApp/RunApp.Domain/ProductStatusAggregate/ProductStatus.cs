using RunApp.Domain.Common;

namespace RunApp.Domain.ProductStatusAggregate
{
    public class ProductStatus : Entity
    {
        internal ProductStatus() { }

        public Guid ProductStatusId { get; internal set; }
        public bool? Like { get; internal set; }
        public bool? Dislike { get; internal set; }
        public bool? Viewed { get; internal set; }
        public bool? Bought { get; internal set; }
        public Guid Id { get; internal set; }
        public Guid ProductId { get; internal set; }

        public static ProductStatus CreateStatus(Guid productId, Guid CustomerId)
        {
            return new ProductStatus()
            {
                ProductStatusId = Guid.NewGuid(),
                ProductId = productId,
                Id = CustomerId,
            };
        }
        public void AddOrRemoveLike(bool like)
        {
            Like = like;
            RaiseEvent();
        }
    }
}
