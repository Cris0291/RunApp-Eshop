using AutoFixture;
using AutoFixture.Kernel;
using RunApp.Domain.Products;
using RunApp.Domain.ReviewAggregate.ReviewEnum;
using System.Reflection;

namespace TestsUtilities.Common
{
    public class ReviewDescriptionEnumFieldAsConstructor : ICustomization
    {
        public void Customize(IFixture fixture)
        {
            fixture.Customize<ReviewDescriptionEnums>(c => c.FromFactory(new AutoFixture.Kernel.MethodInvoker(new FieldAsConstructorQuery())));
        }

        private class FieldAsConstructorQuery : IMethodQuery
        {
            public IEnumerable<IMethod> SelectMethods(Type type)
            {
                throw new NotImplementedException();

            }
        }
    }
}
