﻿using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RunApp.Domain.Common;
using RunApp.Infrastructure.Common.Persistence;

namespace RunApp.Infrastructure.Middleware
{
    public class EventsMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;
        public async Task InvokeAsync(HttpContext httpContext, AppStoreDbContext appDbContext, IPublisher publisher, ILogger<EventsMiddleware> log)
        {
           var transaction =  await appDbContext.Database.BeginTransactionAsync();
            httpContext.Response.OnCompleted(async () =>
            {
               if( httpContext.Items.TryGetValue("DomainEvents", out var events) 
                && events is Queue<IDomainEvent> domainEvents)
                {
                    try
                    {
                        while (domainEvents.TryDequeue(out var resultEvent))
                        {
                           await  publisher.Publish(resultEvent);
                        }

                        await transaction.CommitAsync();
                    }
                    catch(Exception ex)
                    {
                        log.LogInformation("{}", ex.Message);
                    }
                    finally
                    {
                        await transaction.DisposeAsync();
                    }
                }
                else
                {
                    await transaction.CommitAsync();
                    await transaction.DisposeAsync();
                }            
            });

            await _next(httpContext);
        }
    }
}
