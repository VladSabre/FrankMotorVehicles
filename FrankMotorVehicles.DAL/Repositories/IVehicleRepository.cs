using FrankMotorVehicles.DAL.Models;
using System.Linq;

namespace FrankMotorVehicles.DAL.Repositories
{
    public interface IVehicleRepository
    {
        IQueryable<Vehicle> Get();
    }
}
