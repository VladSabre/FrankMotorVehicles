namespace FrankMotorVehicles.API.Models
{
    public class Vehicle
    {
        public int Id { get; set; }

        public string Brand { get; set; }

        public string Model { get; set; }

        public int Year { get; set; }

        public double Price { get; set; }

        public bool Licensed { get; set; }
    }
}
