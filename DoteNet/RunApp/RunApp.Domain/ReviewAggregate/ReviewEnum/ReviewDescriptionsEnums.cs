using Ardalis.SmartEnum;

namespace RunApp.Domain.ReviewAggregate.ReviewEnum
{
    public sealed class ReviewDescriptionEnums : SmartEnum<ReviewDescriptionEnums>
    {
        public static readonly ReviewDescriptionEnums Excellent = new ReviewDescriptionEnums(nameof(Excellent), 1);
        public static readonly ReviewDescriptionEnums Awesome = new ReviewDescriptionEnums(nameof(Awesome), 2);
        public static readonly ReviewDescriptionEnums GoodQuality = new ReviewDescriptionEnums(nameof(GoodQuality), 3);
        public static readonly ReviewDescriptionEnums Incomplete = new ReviewDescriptionEnums(nameof(Incomplete), 4);
        public static readonly ReviewDescriptionEnums Terrible = new ReviewDescriptionEnums(nameof(Terrible), 5);
        public static readonly ReviewDescriptionEnums BadProduct = new ReviewDescriptionEnums(nameof(BadProduct), 6);

        private ReviewDescriptionEnums(string name, int value) : base(name, value) { }
    }

}
