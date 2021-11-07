using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FrankMotorVehicles.DAL.Models
{
    public class Vehicle
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public string Maker { get; set; }

        public string Model { get; set; }

        public int Year { get; set; }

        public double Price { get; set; }

        public bool Licensed { get; set; }

        public DateTime Added { get; set; }

        public int WarehouseId { get; set; }

        public virtual Warehouse Warehouse { get; set; }
    }
}
