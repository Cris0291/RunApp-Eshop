using ErrorOr;
using MediatR;
using RunApp.Domain.ProductAggregate.Tags;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Products.Commands.AddTag
{
    public class AddTagCommandHandler(IProductsRepository productsRepository, IUnitOfWorkPattern unitOfWorkPattern) : IRequestHandler<AddTagCommand, ErrorOr<Tag>>
    {
        IProductsRepository _productsRepository = productsRepository;
        IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern; 
        public async Task<ErrorOr<Tag>> Handle(AddTagCommand request, CancellationToken cancellationToken)
        {
            var product = await _productsRepository.GetProductWithTags(request.ProductId);
            if (product == null) return Error.NotFound(code: "ProductWasNotFoundWithGivenId", description: "Product was not found");

            var tagOrError = product.AddTag(request.TagName);
            if (tagOrError.IsError) return tagOrError.Errors;

            await _unitOfWorkPattern.CommitChangesAsync();
            return tagOrError.Value;
        }
    }
}
