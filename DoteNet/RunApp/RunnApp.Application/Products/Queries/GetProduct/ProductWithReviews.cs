using RunApp.Domain.Products;

namespace RunnApp.Application.Products.Queries.GetProduct
{
    public record ProductWithReviews(Product Product, IEnumerable<ReviewDto> Reviews);
}
