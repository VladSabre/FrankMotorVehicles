using FrankMotorVehicles.DAL.Models;
using System.Linq;

namespace FrankMotorVehicles.DAL.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly FrankMotorVehiclesDBContext _context;

        public VehicleRepository(FrankMotorVehiclesDBContext context)
        {
            _context = context;
        }

        public IQueryable<Vehicle> Get()
        {
            return _context.Vehicles;
        }
    }
}
