using Castle.MicroKernel.Registration;
using Castle.Windsor;
using Castle.Windsor.Installer;

namespace Tests.DependencyInjection
{
    public abstract class BaseContainerFactory
    {
        private IWindsorContainer container;

        public T Resolve<T>()
        {
            return container.Resolve<T>();
        }

        protected IWindsorContainer Container => container ?? (container = new WindsorContainer());

        public virtual void Reset()
        {
            container = new WindsorContainer();
        }

        public virtual void RegisterComponents()
        {
            Container.Install(FromAssembly.This());
        }

        public void RegisterDataComponent<T>(T dataObject)
        {
            Container.Register(Component.For(typeof(T)).Instance(dataObject));
        }
    }
}
