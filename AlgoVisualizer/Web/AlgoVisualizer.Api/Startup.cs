namespace AlgoVisualizer.Api
{
    using System.Reflection;
    using AutoMapper;
    using Common;
    using Common.AutoMapping.Profiles;
    using Infrastructure;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Net.Http.Headers;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            //TODO: Remove this when System.Text.Json supports deserialization for [,] matrices
            services
                .AddControllers()
                .AddNewtonsoftJson();

            services
                .AddApplicationServices()
                .AddDomainServices()
                .AddAutoMapper(Assembly.GetAssembly(typeof(DefaultProfile)));

            services.AddCors(c => c.AddDefaultPolicy(options =>
            {
                options.WithOrigins(GlobalConstants.ClientUrl);
                options.WithHeaders(HeaderNames.ContentType, HeaderNames.Accept);
            }));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}