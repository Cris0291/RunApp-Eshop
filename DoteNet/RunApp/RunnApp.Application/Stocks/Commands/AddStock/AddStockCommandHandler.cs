using ErrorOr;
using MediatR;
using RunApp.Domain.StoreOwnerProfileAggregate.Stocks;
using RunnApp.Application.Common.Interfaces;

namespace RunnApp.Application.Stocks.Commands.AddStock
{
    public class AddStockCommandHandler(IStoreOwnerProfileRepository profileRepository, IUnitOfWorkPattern unitOfWorkPattern) : IRequestHandler<AddStockCommand, ErrorOr<Stock>>
    {
        private readonly IStoreOwnerProfileRepository _profileRepository = profileRepository;
        private readonly IUnitOfWorkPattern _unitOfWorkPattern = unitOfWorkPattern;
        public async Task<ErrorOr<Stock>> Handle(AddStockCommand request, CancellationToken cancellationToken)
        {
            var stroreOwner = await _profileRepository.GetStoreOwnerProfileWithStocks(request.StoreProfileId);
            var stock = stroreOwner.AddStock(request.AddedStock, request.ProductName, request.Brand, request.ProductType, request.ProductId);
            await _unitOfWorkPattern.CommitChangesAsync();
            return stock;
        }
    }
}
