namespace FrankMotorVehicles.BusinessLogic.Models
{
    public class VehicleInfo
    {
        public int Id { get; set; }

        public int WarehouseId { get; set; }

        public string WarehouseName { get; set; }

        public Location WarehouseLocation { get; set; }
    }
}
