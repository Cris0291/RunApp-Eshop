using ErrorOr;
using MediatR;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserCreatedProducts
{
    public class GetUserCreatedProductsQueryHandler() : IRequestHandler<GetUserCreatedProductsQuery, ErrorOr<Success>>
    {
        public async Task<ErrorOr<Success>> Handle(GetUserCreatedProductsQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
