using RunApp.Domain.OrderAggregate;
using RunApp.Domain.OrderAggregate.LineItems;

namespace RunnApp.Application.Common.Interfaces
{
    public interface IOrderRepository
    {
        Task CreateOrder(Order order);
        Task<Order?> GetOrder(Guid orderId);
        Task<Order?> GetOrderWithoutItems(Guid orderId);
        Task DeleteItem(LineItem item);
        Task<Order?> GetCurrentOrder(Guid orderId);
    }
}
