using Microsoft.EntityFrameworkCore;
using RunApp.Domain.OrderAggregate;
using RunApp.Domain.OrderAggregate.LineItems;
using RunApp.Infrastructure.Common.Persistence;
using RunnApp.Application.Common.Interfaces;

namespace RunApp.Infrastructure.Orders.Persistence
{
    public class OrderRepository(AppStoreDbContext appDbContext) : IOrderRepository
    {
        private readonly AppStoreDbContext _appDbContext = appDbContext;
        public async Task CreateOrder(Order order)
        {
            await _appDbContext.AddAsync(order);
        }
        public async Task<Order?> GetOrder(Guid orderId)
        {
            return await _appDbContext.Orders.Include(x => x.LineItems).SingleOrDefaultAsync(x => x.OrderId == orderId);
        }
        public async Task<Order?> GetCurrentOrder(Guid orderId)
        {
            return await _appDbContext.Orders.Include(x => x.LineItems).Where(x => !x.IsPaid).SingleOrDefaultAsync(x => x.OrderId == orderId);
        }
        public async Task<Order?> GetOrderWithoutItems(Guid orderId)
        {
            return await _appDbContext.Orders.SingleOrDefaultAsync(x => x.OrderId == orderId);
        }
        public async Task DeleteItem(LineItem item)
        {
            _appDbContext.Remove(item);
            await Task.CompletedTask;
        }
    }
}
