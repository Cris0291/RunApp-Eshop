﻿namespace Contracts.CustomerProfile.Response
{
    public record CardResponse(string HoldersName, string CardNumber, string CVV, DateTime ExpiryDate);
}