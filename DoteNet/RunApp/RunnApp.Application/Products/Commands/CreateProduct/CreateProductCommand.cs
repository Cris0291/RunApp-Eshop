﻿using ErrorOr;
using MediatR;
using RunApp.Domain.Products;

namespace RunnApp.Application.Products.Commands.CreateProduct
{
     public record CreateProductCommand(string Name, string Description, decimal Price, ICollection<string> Bulletpoints, decimal? PriceWithDiscount, string? PromotionalText, 
         string Brand, string Type, string Color, double Weight, Guid StoreProfileId, string[] Tags) :IRequest<ErrorOr<Product>>;
}
                                                                                  