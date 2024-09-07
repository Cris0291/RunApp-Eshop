using ErrorOr;
using MediatR;
using RunApp.Domain.StoreOwnerProfileAggregate.Stocks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RunnApp.Application.Stocks.Commands.AddStock
{
    public record AddStockCommand(int AddedStock, string ProductName, string Brand, string ProductType, Guid ProductId, Guid StoreProfileId) : IRequest<ErrorOr<Stock>>;
    
}
