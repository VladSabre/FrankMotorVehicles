using FrankMotorVehicles.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace FrankMotorVehicles.DAL
{
    public class FrankMotorVehiclesDBContext : DbContext
    {
        public FrankMotorVehiclesDBContext(DbContextOptions<FrankMotorVehiclesDBContext> contextOptions) : base(contextOptions)
        { }
        
        public DbSet<Vehicle> Vehicles { get; set; }

        public DbSet<Warehouse> Warehouses { get; set; }
    }
}
