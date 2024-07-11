using RunApp.Domain.ProductAggregate.Reviews.Common;

namespace RunApp.Domain.ProductAggregate.Reviews
{
    public class Review
    {
        internal Review() { }

        public Guid ReviewId { get; set; }
        public string Comment { get; set; }
        public double NumOfStars { get; set; }
        //Could be map to the database as a computed column
        public DateTime Date { get; set; }
        public ReviewDescriptions ReviewDescription { get; set; }
        public Guid ProductId { get; set; }

    }
}
