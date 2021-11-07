using FrankMotorVehicles.DAL.Models;
using System;
using System.Linq;

namespace FrankMotorVehicles.DAL
{
    public static class DbInitializer
    {
        public static void Initialize(FrankMotorVehiclesDBContext context)
        {
            context.Database.EnsureCreated();

            if (context.Warehouses.Any())
            {
                return;   // DB has been seeded
            }

            var warehouses = new Warehouse[]
            {
                new Warehouse{Id = 1, Name = "Warehouse A", Location = new Location(47.13111, -61.54801)},
                new Warehouse{Id = 2, Name = "Warehouse B", Location = new Location(15.95386, 7.06246)},
                new Warehouse{Id = 3, Name = "Warehouse C", Location = new Location(39.12788, -2.71398)},
                new Warehouse{Id = 4, Name = "Warehouse D", Location = new Location(-70.84354, 132.22345)}
            };

            foreach (var w in warehouses)
            {
                context.Warehouses.Add(w);
            }
            context.SaveChanges();

            var vehicles = new Vehicle[]
            {
                Create(1, "Volkswagen", "Jetta III", 1995, 12947.5, true, new DateTime(2018, 9, 18), 1),
                Create(2, "Chevrolet", "Corvette", 2004, 20019.64, true, new DateTime(2018, 01, 27), 1),
                Create(3, "Ford", "Expedition EL", 2008, 27323.42, false, new DateTime(2018, 07, 03), 1),
                Create(4, "Infiniti", "FX", 2010, 8541.62, true, new DateTime(2018, 03, 23), 1),
                Create(5, "GMC", "Safari", 1998, 14772.5, false, new DateTime(2018, 07, 04), 1),
                Create(6, "Plymouth", "Colt Vista", 1994, 6642.45, true, new DateTime(2018, 07, 11), 1),
                Create(7, "Cadillac", "Escalade ESV", 2008, 24925.75, false, new DateTime(2018, 01, 29), 1),
                Create(8, "Mitsubishi", "Pajero", 2002, 28619.45, false, new DateTime(2018, 06, 12), 1),
                Create(9, "Infiniti", "Q", 1995, 6103.4, false, new DateTime(2017, 11, 13), 1),
                Create(10, "Ford", "Mustang", 1993, 18992.7, false, new DateTime(2018, 01, 29), 1),
                Create(11, "Chevrolet", "G-Series 1500", 1997, 23362.41, false, new DateTime(2018, 07, 30), 1),
                Create(12, "Cadillac", "DeVille", 1993, 18371.53, false, new DateTime(2018, 01, 24), 1),
                Create(13, "Acura", "NSX", 2001, 23175.76, false, new DateTime(2018, 03, 28), 1),
                Create(14, "Ford", "Econoline E250", 1994, 26605.54, true, new DateTime(2018, 05, 13), 1),
                Create(15, "Lexus", "GX", 2005, 27395.26, false, new DateTime(2017, 11, 12), 1),
                Create(16, "Dodge", "Ram Van 3500", 1999, 6244.51, true, new DateTime(2018, 09, 28), 1),
                Create(17, "Dodge", "Caravan", 1995, 16145.27, false, new DateTime(2017, 11, 25), 1),
                Create(18, "Dodge", "Dynasty", 1992, 15103.84, true, new DateTime(2018, 08, 12), 1),
                Create(19, "Dodge", "Ram 1500", 2004, 9977.65, true, new DateTime(2018, 01, 18), 1),

                Create(20, "Maserati", "Coupe", 2005, 19957.71, false, new DateTime(2017, 11, 14), 2),
                Create(21, "Isuzu", "Rodeo", 1998, 6303.99, false, new DateTime(2017, 12, 03), 2),
                Create(22, "Infiniti", "I", 2002, 6910.16, false, new DateTime(2017, 10, 15), 2),
                Create(23, "Nissan", "Altima", 1994, 8252.66, false, new DateTime(2018, 08, 12), 2),
                Create(24, "Toyota", "Corolla", 2009, 23732.11, false, new DateTime(2018, 02, 13), 2),
                Create(25, "Acura", "MDX", 2011, 8487.19, false, new DateTime(2018, 04, 18), 2),
                Create(26, "BMW", "7 Series", 1998, 29069.52, false, new DateTime(2017, 10, 29), 2),
                Create(27, "Nissan", "Maxima", 2004, 11187.68, false, new DateTime(2018, 07, 16), 2),
                Create(28, "Audi", "A8", 1999, 16047.9, false, new DateTime(2017, 12, 05), 2),
                Create(29, "Nissan", "Murano", 2005, 25859.78, false, new DateTime(2018, 06, 06), 2),
                Create(30, "Acura", "RL", 2010, 13232.13, true, new DateTime(2017, 12, 16), 2),
                Create(31, "Mitsubishi", "Chariot", 1987, 15665.23, false, new DateTime(2018, 02, 21), 2),
                Create(32, "GMC", "3500 Club Coupe", 1992, 18129.37, true, new DateTime(2018, 09, 23), 2),
                Create(33, "Dodge", "Dakota", 2009, 14479.37, false, new DateTime(2017, 12, 12), 2),
                Create(34, "Mercury", "Grand Marquis", 1996, 20614.72, false, new DateTime(2018, 05, 26), 2),
                Create(35, "Kia", "Sportage", 2001, 27106.47, false, new DateTime(2018, 03, 14), 2),
                Create(36, "Chevrolet", "Blazer", 1994, 14835.48, false, new DateTime(2017, 11, 10), 2),
                Create(37, "Mercedes-Benz", "SL-Class", 1994, 27717.28, false, new DateTime(2018, 08, 17), 2),
                Create(38, "Honda", "Civic Si", 2003, 18569.86, true, new DateTime(2018, 09, 12), 2),
                Create(39, "Mercedes-Benz", "CL-Class", 2002, 23494.78, true, new DateTime(2018, 05, 24), 2),
                Create(40, "Volkswagen", "Jetta", 2006, 25469.49, false, new DateTime(2018, 04, 23), 2),
                Create(41, "Pontiac", "Grand Prix", 1975, 11600.74, true, new DateTime(2018, 01, 14), 2),
                Create(42, "Infiniti", "FX", 2012, 22000.62, true, new DateTime(2018, 06, 09), 2),
                Create(43, "Jaguar", "XK", 2006, 10260.79, true, new DateTime(2018, 09, 28), 2),
                Create(44, "Cadillac", "STS", 2007, 13740.2, false, new DateTime(2018, 02, 25), 2),
                Create(45, "Pontiac", "Sunfire", 1997, 28489.1, false, new DateTime(2017, 12, 05), 2),
                Create(46, "Cadillac", "SRX", 2004, 26750.38, true, new DateTime(2018, 08, 07), 2),
                Create(47, "Land Rover", "Freelander", 2004, 21770.59, false, new DateTime(2018, 09, 01), 2),
                Create(48, "Suzuki", "Forenza", 2005, 28834.26, false, new DateTime(2018, 05, 09), 2),
                Create(49, "Saab", "9, 7X", 2005, 25975.68, false, new DateTime(2018, 06, 07), 2),
                Create(50, "Ford", "Fusion", 2012, 28091.96, false, new DateTime(2018, 07, 15), 2),

                Create(51, "Cadillac", "Escalade", 2005, 7429.18, true, new DateTime(2018, 09, 26), 3),
                Create(52, "Porsche", "Cayenne", 2011, 17066.31, true, new DateTime(2017, 10, 19), 3),
                Create(53, "Mercedes-Benz", "SL-Class", 2005, 14066.06, false, new DateTime(2018, 08, 08), 3),
                Create(54, "Mitsubishi", "RVR", 1995, 22560.18, false, new DateTime(2018, 05, 25), 3),
                Create(55, "Volvo", "850", 1995, 25762.08, true, new DateTime(2017, 10, 03), 3),
                Create(56, "Honda", "del Sol", 1994, 18840.96, true, new DateTime(2017, 11, 25), 3),
                Create(57, "Infiniti", "Q", 1996, 28773.14, true, new DateTime(2018, 08, 09), 3),
                Create(58, "Mercedes-Benz", "500E", 1992, 17141.08, true, new DateTime(2018, 08, 13), 3),
                Create(59, "GMC", "Envoy XL", 2002, 18983.52, true, new DateTime(2018, 03, 14), 3),
                Create(60, "Volkswagen", "Touareg 2", 2008, 15611.22, true, new DateTime(2018, 02, 22), 3),

                Create(61, "Saab", "900", 1987, 8771, false, new DateTime(2017, 12, 01), 4),
                Create(62, "Mazda", "B-Series", 1998, 23407.59, false, new DateTime(2018, 03, 01), 4),
                Create(63, "GMC", "Sierra 3500", 2012, 5869.23, true, new DateTime(2018, 04, 27), 4),
                Create(64, "Chevrolet", "Corvette", 1964, 16630.67, true, new DateTime(2018, 05, 31), 4),
                Create(65, "Toyota", "Tacoma", 1997, 11597.18, false, new DateTime(2018, 03, 30), 4),
                Create(66, "GMC", "Sonoma", 2004, 18248.21, false, new DateTime(2018, 03, 09), 4),
                Create(67, "Bugatti", "Veyron", 2009, 8051.64, false, new DateTime(2018, 01, 10), 4),
                Create(68, "Dodge", "Ram 1500 Club", 1996, 14008.3, false, new DateTime(2018, 05, 01), 4),
                Create(69, "Land Rover", "Discovery Series II", 2001, 18620.19, false, new DateTime(2018, 03, 03), 4),
                Create(70, "Volvo", "960", 1993, 7316.93, true, new DateTime(2018, 02, 15), 4),
                Create(71, "Chrysler", "LHS", 2001, 29444.71, false, new DateTime(2017, 10, 25), 4),
                Create(72, "Porsche", "944", 1984, 7396.95, true, new DateTime(2017, 10, 26), 4),
                Create(73, "Subaru", "Legacy", 2010, 24491.8, false, new DateTime(2017, 12, 26), 4),
                Create(74, "Volvo", "XC90", 2003, 29009.65, true, new DateTime(2018, 04, 24), 4),
                Create(75, "Buick", "Skyhawk", 1985, 10567.27, false, new DateTime(2018, 03, 21), 4),
                Create(76, "GMC", "Envoy XUV", 2004, 20997.71, true, new DateTime(2018, 03, 27), 4),
                Create(77, "Volvo", "S60", 2009, 28614.95, false, new DateTime(2018, 07, 25), 4),
                Create(78, "Pontiac", "Montana", 2000, 11221.14, false, new DateTime(2018, 01, 04), 4),
                Create(79, "Lexus", "RX", 2002, 23194.01, false, new DateTime(2018, 05, 02), 4),
                Create(80, "Lexus", "RX", 2000, 17805.45, false, new DateTime(2018, 09, 11), 4)
            };

            foreach (var v in vehicles)
            {
                context.Vehicles.Add(v);
            }
            context.SaveChanges();
        }

        private static Vehicle Create(
            int id, 
            string maker, 
            string model, 
            int year, 
            double price, 
            bool licensed, 
            DateTime added, 
            int warehouseId)
        {
            return new Vehicle
            {
                Id = id,
                Maker = maker,
                Model = model,
                Year = year,
                Price = price,
                Licensed = licensed,
                Added = added,
                WarehouseId = warehouseId
            };
        }
    }
}
