using ErrorOr;
using MediatR;
using RunnApp.Application.Common.Interfaces;
using RunnApp.Application.Products.Commands.CreateProduct;

namespace RunnApp.Application.Products.Commands.CreateProduct
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, ErrorOr<Guid>>
    {
        private readonly IProductsRepository _productsRepository;
        public CreateProductCommandHandler(IProductsRepository productsRepository)
        {
            _productsRepository = productsRepository;
        }
        public async Task<ErrorOr<Guid>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
           
        }
    }
}
