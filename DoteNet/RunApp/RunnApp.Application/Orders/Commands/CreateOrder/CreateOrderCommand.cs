using ErrorOr;
using MediatR;
using RunApp.Domain.OrderAggregate;

namespace RunnApp.Application.Orders.Commands.CreateOrder
{
    public record CreateOrderCommand(Guid UserId, string ZipCode, string Street, string City, 
                                     int BuildingNumber, string Country, string? AlternativeStreet, 
                                     int? AlternativeBuildingNumber, string HoldersName, 
                                     string CardNumber, string CVV, DateTime ExpiryDate, Item[] Items) : IRequest<ErrorOr<Order>>;
}
