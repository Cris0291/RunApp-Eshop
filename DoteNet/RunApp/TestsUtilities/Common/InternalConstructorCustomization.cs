using AutoFixture;
using AutoFixture.Kernel;
using RunApp.Domain.Products;
using System.Reflection;

namespace TestsUtilities.Common
{
    public class InternalConstructorCustomization<T> : ICustomization
    {
        public void Customize(IFixture fixture)
        {
            fixture.Customize<T>(c => c.FromFactory(new AutoFixture.Kernel.MethodInvoker(new NonPublicConstructorQuery())));
        }

        private class NonPublicConstructorQuery : IMethodQuery
        {
            public IEnumerable<IMethod> SelectMethods(Type type)
            {
                if (type == null) throw new ArgumentNullException("Given type must not be null");


                return type.GetConstructors(BindingFlags.Instance | BindingFlags.NonPublic).Select(constructor => new ConstructorMethod(constructor));

            }
        }
    }
}
