using FrankMotorVehicles.API.Models;
using FrankMotorVehicles.BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace FrankMotorVehicles.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleService _service;

        public VehicleController(IVehicleService service)
        {
            _service = service;
        }

        // GET api/<VehicleController>
        [HttpGet]
        public IEnumerable<Vehicle> Get()
        {
            return _service.GetAll().Select(v => new Vehicle
            {
                Id = v.Id,
                Brand = v.Brand,
                Model = v.Model,
                Year = v.Year,
                Price = v.Price,
                Licensed = v.Licensed
            });
        }

        // GET api/<VehicleController>/5
        [HttpGet("{id}")]
        public ActionResult<VehicleInfo> Get(int id)
        {
            var info = _service.GetInfo(id);

            if (info == null)
                return NotFound();

            return new VehicleInfo
            {
                Id = info.Id,
                WarehouseName = info.WarehouseName,
                WarehouseLocation = new Location
                {
                    Latitude = info.WarehouseLocation.Latitude,
                    Longitude = info.WarehouseLocation.Longitude
                }
            };
        }
    }
}
