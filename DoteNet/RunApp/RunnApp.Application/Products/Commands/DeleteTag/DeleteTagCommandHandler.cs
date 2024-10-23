using ErrorOr;
using MediatR;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Products.Commands.DeleteTag
{
    public class DeleteTagCommandHandler(IProductsRepository productsRepository, IUnitOfWorkPattern unitOfWorkPattern) : IRequestHandler<DeleteTagCommand, ErrorOr<Success>>
    {
        private readonly IProductsRepository _productsRepository = productsRepository;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        public async Task<ErrorOr<Success>> Handle(DeleteTagCommand request, CancellationToken cancellationToken)
        {
            var product = await _productsRepository.GetProductWithTags(request.ProductId, request.TagId);
            if (product == null) return Error.NotFound(code: "ProductWasNotFoundWithGivenId", description: "Product was not found");

            var tagOrError = product.DeleteTag(request.TagId);
            if(tagOrError.IsError) return tagOrError.Errors;

            await _productsRepository.DeleteTag(tagOrError.Value);

            await _unitOfWorkPattern.CommitChangesAsync();
            return Result.Success;
        }
    }
}
