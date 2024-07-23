namespace RunApp.Api.Routes
{
    public static class ApiEndpoints
    {
        private const string Base = "api";

        public class Products
        {
            private const string ProductBase = $"{Base}/products";
            public const string Create = ProductBase;
            public const string GetProductById = $"{ProductBase}/{{id:guid}}";
            public const string DeleteProduct = $"{ProductBase}/{{id:guid}}";
            public const string UpdateProduct = $"{ProductBase}/{{id:guid}}";
            public const string GetProducts = ProductBase;

            public const string AddReview = $"{ProductBase}/{{id:guid}}/reviews";
            public const string DeleteReview = $"{ProductBase}/{{id:guid}}/reviews";

            public const string AddPriceWithDiscount = $"{ProductBase}/{{id:guid}}/discounts";
            public const string DeletePriceWithDiscount = $"{ProductBase}/{{id:guid}}/discounts";
        }
    }
}
