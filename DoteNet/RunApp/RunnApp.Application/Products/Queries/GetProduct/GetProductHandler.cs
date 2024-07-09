using ErrorOr;
using MediatR;
using RunApp.Domain.Products;

namespace RunnApp.Application.Products.Queries.GetProduct
{
    internal class GetProductHandler : IRequestHandler<GetProductQuery, ErrorOr<Product>>
    {
        public Task<ErrorOr<Product>> Handle(GetProductQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
