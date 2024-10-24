namespace RunApp.Api.Contracts
{
    public record PhotoRequestDto(Guid ProductId, IFormFile photo);
}
