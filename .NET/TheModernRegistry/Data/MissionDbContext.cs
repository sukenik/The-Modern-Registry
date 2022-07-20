using Microsoft.EntityFrameworkCore;
using TheModernRegistry.Models;

namespace TheModernRegistry.Data
{
    public class MissionDbContext : DbContext
    {
        public MissionDbContext(DbContextOptions<MissionDbContext> options) : base(options)
        {

        }
        public DbSet<Mission> Missions { get; set; }
    }
}
