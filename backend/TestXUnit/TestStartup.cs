using GotIt_back.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GotItTest
{
    internal class TestStartup
    {
        public static ServiceProvider CreateServiceProvider()
        {
            var services = new ServiceCollection();

            // Tutaj dodaj swoje serwisy i zależności
            services.AddScoped<CardService>();
            //services.AddTransient<IMyService, MyService>();

            // Zastąp lub dodaj swoje zależności
            //services.Replace(ServiceDescriptor.Singleton<IMyDependency, MyDependency>());

            return services.BuildServiceProvider();
        }
    }
}
