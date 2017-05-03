using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(VM.Startup))]
namespace VM
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
