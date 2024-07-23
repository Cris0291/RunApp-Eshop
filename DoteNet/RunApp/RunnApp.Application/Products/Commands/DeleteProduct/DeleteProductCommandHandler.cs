using ErrorOr;
using MediatR;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Products.Commands.DeleteProduct
{
    public class DeleteProductCommandHandler(IUnitOfWorkPattern unitOfWorkPattern, IProductsRepository productsRepository) : IRequestHandler<DeleteProductCommand, ErrorOr<Success>>
    {
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        private readonly IProductsRepository _productsRepository = productsRepository;
        public async Task<ErrorOr<Success>> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            if (request.ProductId == Guid.Empty) return Error.Validation(code: "ProductIdWasNotValid", description: "Product must have a valid id");

           bool existProduct =  await _productsRepository.ExistProduct(request.ProductId);
           if(!existProduct) return Error.NotFound(code: "ProductWasNotFoundWithGivenId", description: "Product was not found");

           await _productsRepository.DeleteProduct(request.ProductId);
          int numberOfRowsDeleted =  await _unitOfWorkPattern.CommitChangesAsync();
            if (numberOfRowsDeleted == 0) throw new InvalidOperationException("Product could not be deleted");

            return Result.Success;
        }
    }
}
