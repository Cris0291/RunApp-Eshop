using ErrorOr;
using FluentValidation.Results;
using MediatR;
using RunApp.Domain.Products;
using RunnApp.Application.Common.Interfaces;
using RunnApp.Application.Products.Commands.CreateProduct;


namespace RunnApp.Application.Products.Commands.CreateProduct
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, ErrorOr<Product>>
    {
        private readonly IProductsRepository _productsRepository;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern;
        public CreateProductCommandHandler(IProductsRepository productsRepository, IUnitOfWorkPattern unitOfWorkPattern)
        {
            _productsRepository = productsRepository;
            _unitOfWorkPattern = unitOfWorkPattern;
        }
        public async Task<ErrorOr<Product>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            ErrorOr<Product> productOrError = Product.CreateProduct(request.Name, request.Description, request.Price, request.Bulletpoints, request.PriceWithDiscount, request.PromotionalText);

            if (productOrError.IsError) return productOrError.Errors;

            await _productsRepository.CreateProduct(productOrError.Value);

           int rowsChanged = await _unitOfWorkPattern.CommitChangesAsync();

            if (rowsChanged == 0 && productOrError.Value.ProductId == Guid.Empty) throw new InvalidOperationException("Product could not be added to the database");

            return productOrError.Value;
        }
    }
}
