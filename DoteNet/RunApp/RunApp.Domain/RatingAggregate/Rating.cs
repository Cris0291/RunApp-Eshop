namespace RunApp.Domain.RatingAggregate
{
    public class Rating
    {
        internal Rating() { }
        public Guid RatingId { get; internal set; }
        public float NumOfStars { get; internal set; }
        public DateTime DateOfRate { get; internal set; }
        public Guid Id { get; internal set; }
        public Guid ProductId { get; internal set; }
    }
}
