using RunApp.Domain.Common;
using RunApp.Domain.ReviewAggregate.Events;
using RunApp.Domain.ReviewAggregate.ReviewEnum;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("TestsUtilities")]
namespace RunApp.Domain.ReviewAggregate
{
    public class Review : Entity
    {
        internal Review() { }
        public Guid ReviewId { get; internal set; }
        public string Comment { get; internal set; }
        public DateTime Date { get; internal set; }
        public ReviewDescriptionEnums ReviewDescription { get; internal set; }
        public Guid? ProductId { get; internal set; }
        public Guid Id { get; internal set; }
        public static Review CreateReview(string comment, ReviewDescriptionEnums reviewDescription, Guid productId, Guid customerProfileId)
        {
            var review = new Review()
            {
                ReviewId = Guid.NewGuid(),
                Id = customerProfileId,
                Comment = comment,
                ReviewDescription = reviewDescription,
                ProductId = productId
            };

            review.RaiseEvent(new AddReviewEvent(review.ReviewId, productId, customerProfileId));
            return review;
        }

        public void RemoveReview(Guid reviewId, Guid productId, Guid customerProfileId)
        {
            RaiseEvent(new DeleteReviewEvent(reviewId, productId, customerProfileId));
        }
        public void UpdateReview(string comment, ReviewDescriptionEnums reviewDescription)
        {
            Comment = comment;
            ReviewDescription = reviewDescription;
        }
    }
}
