using TheModernRegistry.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace TheModernRegistry.Models
{
    public static class PrepDB
    {
        public static void PrepPopulation(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<MissionDbContext>());
            }
        }

        public static void SeedData(MissionDbContext context)
        {
            context.Database.Migrate();
            context.SaveChanges();
        }
    }
}