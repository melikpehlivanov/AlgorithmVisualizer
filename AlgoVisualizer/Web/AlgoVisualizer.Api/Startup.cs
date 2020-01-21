namespace AlgoVisualizer.Api
{
    using System.Reflection;
    using AutoMapper;
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
        private const string ClientUrl = "https://localhost:3000";

        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddControllers();

            services
                .AddApplicationServices()
                .AddDomainServices()
                .AddAutoMapper(Assembly.GetAssembly(typeof(DefaultProfile)));

            services.AddCors(c => c.AddDefaultPolicy(options =>
            {
                options.WithOrigins(ClientUrl);
                options.WithHeaders(HeaderNames.ContentType, HeaderNames.Accept);
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
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