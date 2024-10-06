using RunApp.Domain.Common;
using RunApp.Domain.RatingAggregate.Events;

namespace RunApp.Domain.RatingAggregate
{
    public class Rating : Entity
    {
        internal Rating() { }
        public Guid RatingId { get; internal set; }
        public int NumOfStars { get; internal set; }
        public DateTime DateOfRate { get; internal set; }
        public Guid Id { get; internal set; }
        public Guid? ProductId { get; internal set; }

        public static Rating CreateRating(Guid productId, Guid customerId, int userRating)
        {
            var rating = new Rating()
            {
                RatingId = Guid.NewGuid(),
                ProductId = productId,
                Id = customerId
            };

            rating.RaiseEvent(new AddRatingEvent(productId, customerId, rating.RatingId, userRating));

            return rating;
        }

        public void Rate(int rate)
        {
            NumOfStars = rate;
        }
    }
}
