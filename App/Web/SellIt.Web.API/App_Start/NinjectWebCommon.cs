[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(SellIt.Web.API.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(SellIt.Web.API.App_Start.NinjectWebCommon), "Stop")]

namespace SellIt.Web.API.App_Start
{

    using System;
    using System.Reflection;
    using System.Web;

    using Microsoft.Web.Infrastructure.DynamicModuleHelper;

    using Ninject;
    using Ninject.Web.Common;
    using Ninject.Web.Common.WebHost;
    using SellIt.Data;
    using SellIt.Services.Advertisement;
    using SellIt.Services.User;
    using WebApiContrib.IoC.Ninject;

    public static class NinjectWebCommon
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start()
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }

        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }

        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

                RegisterServices(kernel);
                return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind(typeof(IUnitOfWork)).ToMethod<IUnitOfWork>(context =>
            {
                SellItDbContext databaseContext = new SellItDbContext();
                return new UnitOfWork(databaseContext);
            }).InRequestScope();

            kernel.Bind<IUserService>().To<UserService>().InRequestScope();
            kernel.Bind<IAdvertisementService>().To<AdvertisementService>().InRequestScope();

            System.Web.Http.GlobalConfiguration.Configuration.DependencyResolver = new NinjectResolver(kernel);
        }
    }
}