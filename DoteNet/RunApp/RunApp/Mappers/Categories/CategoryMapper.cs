using Contracts.Categories.Response;
using RunApp.Domain.ProductAggregate.Categories;

namespace RunApp.Api.Mappers.Categories
{
    public static class CategoryMapper
    {
        public static CategoryResponse TagToTagResponse(this Category category)
        {
            return new CategoryResponse(category.CategoryId, category.CategoryName); 
        }
    }
}
