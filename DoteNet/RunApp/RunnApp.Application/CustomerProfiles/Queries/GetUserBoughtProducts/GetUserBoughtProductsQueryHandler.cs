using ErrorOr;
using MediatR;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.CustomerProfiles.Queries.GetUserBoughtProducts
{
    public class GetUserBoughtProductsQueryHandler(ICustomerProfileRepository customerProfileRepository, ILeftJoinRepository leftJoinRepository, IUnitOfWorkPattern unitOfWorkPattern) : IRequestHandler<GetUserBoughtProductsQuery, ErrorOr<Success>>
    {
        private readonly ICustomerProfileRepository _customerProfileRepository = customerProfileRepository;
        private readonly ILeftJoinRepository _leftJoinRepository = leftJoinRepository;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        public async Task<ErrorOr<Success>> Handle(GetUserBoughtProductsQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
