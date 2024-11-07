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
            public const string UpdateReview = $"{ProductBase}/{{id:guid}}/reviews";

            public const string AddPriceWithDiscount = $"{ProductBase}/{{id:guid}}/discounts";
            public const string DeletePriceWithDiscount = $"{ProductBase}/{{id:guid}}/discounts";

            public const string AddOrRemoveProductLike = $"{ProductBase}/{{id:guid}}/likes/like";
            public const string AddOrRemoveProductDislike = $"{ProductBase}/{{id:guid}}/likes/Dislike";

            public const string AddRating = $"{ProductBase}/{{id:guid}}/rates";

            public const string AddCategory = $"{ProductBase}/{{id:guid}}/categories";
            public const string DeleteCategory = $"{ProductBase}/{{Productid:guid}}categories/{{Categoryid:guid}}";

            public const string AddPhoto = $"{ProductBase}/{{id:guid}}/photos";
            public const string RemovePhoto = $"{ProductBase}/{{productId:guid}}/photos/{{photoId:string}}";

        }
        public static class Account
        {
            private const string AccountBase = $"{Base}/accounts";
            public const string Login = $"{AccountBase}/login";
            public const string LoginSalesProfile = $"{AccountBase}/login/sales";
            public const string Register = $"{AccountBase}/register";
            public const string Logout = $"{AccountBase}/logout";
        }
        public static class StoreOwnerProfiles
        {
            private const string StoreOwnerProfileBase = $"{Base}/storeprofiles";
            public const string CreateStoreOwnerProfile = StoreOwnerProfileBase;
            public const string AddStock = $"{StoreOwnerProfileBase}/stocks";
            public const string RemoveStock = $"{StoreOwnerProfileBase}/stocks";
        }
        public static class CustomerProfiles
        {
            private const string UserBase = $"{Base}/user";
            public const string GetUserReviews = $"{UserBase}/reviews";
            public const string GetUserRatings = $"{UserBase}/ratings";
            public const string GetUserLikes = $"{UserBase}/likes";
            public const string AddAddress = $"{UserBase}/address";
        }
        public static class Orders
        {
            private const string OrderBase = $"{Base}/orders";
            public const string Create = OrderBase;
            public const string AddItem = $"{OrderBase}/{{id:guid}}/lineitems";
            public const string DeleteItem = $"{OrderBase}/{{id:guid}}/lineitems";
            public const string ChangeItemQuantity = $"{OrderBase}/{{id:guid}}/lineitems";
            public const string ModifyOrderAddress = $"{OrderBase}/{{id:guid}}/address";
            public const string ModifyPaymentMethod = $"{OrderBase}/{{id:guid}}/paymentmethod";
            public const string PayOrder = $"{OrderBase}/{{id:guid}}/checkout";
        }
    }
}
