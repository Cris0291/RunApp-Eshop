namespace RunApp.Api.Routes
{
    public static class ApiEndpoints
    {
        private const string Base = "api";

        public static class Products
        {
            private const string ProductBase = $"{Base}/products";
            public const string Create = ProductBase;
            public const string GetProductById = $"{ProductBase}/{{id:guid}}";
            public const string DeleteProduct = $"{ProductBase}/{{id:guid}}";
            public const string UpdateProduct = $"{ProductBase}/{{id:guid}}";
            public const string GetProducts = ProductBase;

            public const string AddReview = $"{ProductBase}/{{id:guid}}/reviews";
            public const string DeleteReview = $"{ProductBase}/{{ProductId:guid}}/reviews";

            public const string AddPriceWithDiscount = $"{ProductBase}/{{id:guid}}/discounts";
            public const string DeletePriceWithDiscount = $"{ProductBase}/{{id:guid}}/discounts";

        }
        public static class Account
        {
            private const string AccountBase = $"{Base}/accounts";
            public const string Login = $"{AccountBase}/login";
            public const string Register = $"{AccountBase}/register";
            public const string Logout = $"{AccountBase}/logout";
        }
    }
}
