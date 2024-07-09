﻿using ErrorOr;
using System.Diagnostics;

namespace RunApp.Domain.ProductAggregate.ProductErrors
{
    public static class ProductError
    {
        public static Error BulletPointsCollectionShoulNotBeEmpty = Error.Validation(code: "BulletPointsCollectionShoulNotBeEmpty", description: "The collection of bullet points should not be empty");
        public static Error AllProductsMustHaveAName = Error.Validation(code: "AllProductsMustHaveAName", description: "All products must have a name");
        public static Error DiscountPricesMustBeMaximum70Percent = Error.Validation(code: "DiscountPricesMustBeMaximum70Percent", description: "Maximum discount must be of 70% on a product");
        public static Error AllPricesWithDiscountMustHaveAPromotionalText = Error.Validation(code: "AllPricesWithDiscountMustHaveAPromotionalText", description: "All prices with discount must have a promotional text");
    }
}
