﻿using ErrorOr;
using RunApp.Domain.ProductAggregate.ProductErrors;
using RunApp.Domain.ProductAggregate.Reviews.ReviewErrors;
using System.Collections.Immutable;
using System.Linq.Expressions;

namespace RunApp.Domain
{
    public  class ValidationHandler: ErrorHandler
    {
        private static Dictionary<string, Func<bool>> _validationTree = new();

        protected static void AddValidation(string key, Func<bool> validationFunction)
        {
            _validationTree[key] = validationFunction;
        }

        protected static void Validate()
        {
            foreach ( (string key, var value) in _validationTree)
            {
                if (value.Invoke())
                {
                    MapKeyToError(key);
                }
            }
            _validationTree.Clear();
        }

        private static void MapKeyToError(string key)
        {
            Error ValidationError = key switch
            {
               nameof(ProductError.AllProductsMustHaveAName) => ProductError.AllProductsMustHaveAName,
               nameof(ProductError.BulletPointsCollectionShoulNotBeEmpty) => ProductError.BulletPointsCollectionShoulNotBeEmpty,
               nameof(ProductError.DiscountPricesMustBeMaximum70Percent) => ProductError.DiscountPricesMustBeMaximum70Percent,
               nameof(ProductError.AllPricesWithDiscountMustHaveAPromotionalText) => ProductError.AllPricesWithDiscountMustHaveAPromotionalText,
               nameof(ProductError.AllProductsMustHaveADescription) => ProductError.AllProductsMustHaveADescription,
               nameof(ProductError.ActualPriceCannotBeLowerThanPriceWithDiscount) => ProductError.ActualPriceCannotBeLowerThanPriceWithDiscount,
               nameof(ReviewError.AllReviewsMustHaveAComment) => ReviewError.AllReviewsMustHaveAComment,
               nameof(ReviewError.MinimumNunberOfStarsCannotBeLessThanOne) => ReviewError.MinimumNunberOfStarsCannotBeLessThanOne
            };

            AddError(ValidationError);
        }
    }
}