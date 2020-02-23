namespace AlgoVisualizer.Api.Infrastructure
{
    using System.Linq;
    using System.Reflection;
    using Microsoft.Extensions.DependencyInjection;
    using Services;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDomainServices(this IServiceCollection services)
        {
            var assembly = Assembly.GetAssembly(typeof(IService));

            AddAssemblyServices(services, assembly);

            return services;
        }

        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();

            AddAssemblyServices(services, assembly);

            return services;
        }

        private static void AddAssemblyServices(IServiceCollection services, Assembly assembly)
        {
            var servicesToRegister = assembly
                .GetTypes()
                .Where(t => t.IsClass
                            && !t.IsAbstract
                            && t.GetInterfaces()
                                .Any(i => i.Name == $"I{t.Name}"))
                .Select(t => new
                {
                    Interface = t.GetInterface($"I{t.Name}"),
                    Implementation = t
                })
                .ToList();

            servicesToRegister.ForEach(s => services.AddTransient(s.Interface, s.Implementation));
        }
    }
}