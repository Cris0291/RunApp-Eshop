using ErrorOr;
using MediatR;
using RunnApp.Application.Common.Interfaces;
using System.Reflection;

namespace RunnApp.Application.ProductStatuses.Commands.AddProductStatus
{
    public class AddProductStatusCommandHandler(ICustomerProfileRepository customerProfileRepository, IProductsRepository productsRepository, IUnitOfWorkPattern unitOfWork) : IRequestHandler<AddProductStatusCommand, ErrorOr<Success>>
    {
        private readonly ICustomerProfileRepository _customerProfileRepository = customerProfileRepository;
        private readonly IProductsRepository _productsRepository = productsRepository;
        private readonly IUnitOfWorkPattern _unitOfWork = unitOfWork;
        public async Task<ErrorOr<Success>> Handle(AddProductStatusCommand request, CancellationToken cancellationToken)
        {
            var nonNullProperties = GetNonNullStatus(request);
            var customer = await _customerProfileRepository.GetCustomerProfileWithStatuses(request.UserId, request.ProductId);
            if (customer == null) return Error.NotFound(code: "CustomerProfileWasNotFoundWithGivenId", description: "Requested customer was not found");

            bool existProduct = await _productsRepository.ExistProduct(request.ProductId);
            if(!existProduct) return Error.NotFound(code: "ProductWasNotFoundWithGivenId", description: "Product was not found");

            
            var errororSuccess = customer.CreateOrUpdateProductStatus(request.ProductId, nonNullProperties, customer.Statuses.Count == 0);
            if (errororSuccess.IsError) return errororSuccess.Errors;

            await _unitOfWork.CommitChangesAsync();

            return errororSuccess.Value;
        }

        private Dictionary<string, bool> GetNonNullStatus(AddProductStatusCommand request)
        {
            Dictionary<string, bool> nonNullStatus = new();

            var requestType = request.GetType();
            PropertyInfo[] properties = requestType.GetProperties();
            foreach (var property in properties)
            {
                if (property.PropertyType != typeof(bool?)) continue;

                var value = property.GetValue(request);
                if (value == null) continue;

                nonNullStatus[property.Name] = (bool)value;
            }
            return nonNullStatus;
        }
    }
}
