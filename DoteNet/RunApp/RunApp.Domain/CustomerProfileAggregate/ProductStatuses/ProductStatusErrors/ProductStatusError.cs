using ErrorOr;

namespace RunApp.Domain.CustomerProfileAggregate.ProductStatuses.ProductStatusErrors
{
    public static class ProductStatusError
    {
        public static Error LikeAndDislikeStatusesCannotBeSetAtTheSameTime = Error.Validation(code: "LikeAndDislikeStatusesCannotBeSetAtTheSameTime", description: "like and dislike statuses cannot be set simultaneously");
    }
}
