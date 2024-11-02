using ErrorOr;
using MediatR;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Products.Commands.DeleteCategory
{
    public class DeleteCategoryCommandHandler(IProductsRepository productsRepository, IUnitOfWorkPattern unitOfWorkPattern) : IRequestHandler<DeleteCategoryCommand, ErrorOr<Success>>
    {
        private readonly IProductsRepository _productsRepository = productsRepository;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        public async Task<ErrorOr<Success>> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var product = await _productsRepository.GetProductWithCategories(request.ProductId, request.CategoryId);
            if (product == null) return Error.NotFound(code: "ProductWasNotFoundWithGivenId", description: "Product was not found");

            var categoryOrError = product.DeleteCategory(request.CategoryId);
            if(categoryOrError.IsError) return categoryOrError.Errors;

            await _productsRepository.DeleteCategory(categoryOrError.Value);

            await _unitOfWorkPattern.CommitChangesAsync();
            return Result.Success;
        }
    }
}
