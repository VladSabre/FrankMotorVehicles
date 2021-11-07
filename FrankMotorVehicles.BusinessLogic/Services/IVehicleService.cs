using FrankMotorVehicles.BusinessLogic.Models;
using System.Collections.Generic;

namespace FrankMotorVehicles.BusinessLogic.Services
{
    public interface IVehicleService
    {
        IList<Vehicle> GetAll();

        VehicleInfo GetInfo(int id);
    }
}
