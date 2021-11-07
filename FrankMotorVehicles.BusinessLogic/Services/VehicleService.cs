using FrankMotorVehicles.BusinessLogic.Models;
using FrankMotorVehicles.DAL.Repositories;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FrankMotorVehicles.BusinessLogic.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _repository;
        
        public VehicleService(IVehicleRepository repository)
        {
            _repository = repository;
        }

        public IList<Vehicle> GetAll()
        {
            return _repository.Get()
                .OrderBy(v => v.Added)
                .Select(v => new Vehicle
                {
                    Id = v.Id,
                    Brand = v.Maker,
                    Model = v.Model,
                    Year = v.Year,
                    Price = v.Price,
                    Licensed = v.Licensed
                }).ToList();
        }

        public VehicleInfo GetInfo(int id)
        {
            return _repository.Get()
                .Include(v => v.Warehouse)
                .Where(v => v.Id == id)
                .Select(v => new VehicleInfo
                {
                    Id = v.Id,
                    WarehouseName = v.Warehouse.Name,
                    WarehouseLocation = new Location
                    {
                        Latitude = v.Warehouse.Location.Latitude,
                        Longitude = v.Warehouse.Location.Longitude
                    }
                }).SingleOrDefault();
        }
    }
}
