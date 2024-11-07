using ErrorOr;
using MediatR;
using RunApp.Domain.Products;
using RunnApp.Application.Common.Interfaces;
using RunnApp.Application.Products.Queries.GetProducts;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserBoughtProducts
{
    public class GetUserBoughtProductsQueryHandler(ICustomerProfileRepository customerProfileRepository, ILeftJoinRepository leftJoinRepository) : IRequestHandler<GetUserBoughtProductsQuery, ErrorOr<IEnumerable<ProductWithMainImage>>>
    {
        private readonly ICustomerProfileRepository _customerProfileRepository = customerProfileRepository;
        private readonly ILeftJoinRepository _leftJoinRepository = leftJoinRepository;
        public async Task<ErrorOr<IEnumerable<ProductWithMainImage>>> Handle(GetUserBoughtProductsQuery request, CancellationToken cancellationToken)
        {
            var customer = await _customerProfileRepository.GetCustomerProfile(request.userId);
            if (customer == null) return Error.Validation(code: "UserWsNotFound", description: "User was not found");

            var productsQuery = _leftJoinRepository.GetBoughtProductWithImage(customer.BoughtProducts);
            return await _leftJoinRepository.ExecuteQuery(productsQuery);
        }
    }
}
