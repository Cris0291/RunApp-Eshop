﻿using FluentValidation;

namespace RunnApp.Application.Products.Commands.CreateProduct
{
    public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
    {
        public CreateProductCommandValidator()
        {
            RuleFor(command => command.Name).NotNull().NotEmpty();
            RuleFor(command => command.Description).NotNull().NotEmpty();
            RuleFor(command => command.Price).GreaterThanOrEqualTo(0);
            RuleFor(command => command.PriceWithDiscount).GreaterThanOrEqualTo(0m);
            RuleFor(command => command.Brand).NotNull().NotEmpty();
            RuleFor(command => command.Type).NotNull().NotEmpty();
            RuleFor(command => command.Color).NotNull().NotEmpty();
            RuleFor(command => command.Weight).GreaterThan(0);
        }
    }
}
