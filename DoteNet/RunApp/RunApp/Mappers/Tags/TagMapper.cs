using Contracts.Tags.Response;
using RunApp.Domain.ProductAggregate.Tags;

namespace RunApp.Api.Mappers.Tags
{
    public static class TagMapper
    {
        public static TagResponse TagToTagResponse(this Tag tag)
        {
            return new TagResponse(tag.TagId, tag.TagName); 
        }
    }
}
