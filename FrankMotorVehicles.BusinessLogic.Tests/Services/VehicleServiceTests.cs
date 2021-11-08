using FluentAssertions;
using FrankMotorVehicles.BusinessLogic.Models;
using FrankMotorVehicles.BusinessLogic.Services;
using FrankMotorVehicles.DAL.Repositories;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;

namespace FrankMotorVehicles.BusinessLogic.Tests.Services
{
    public class VehicleServiceTests
    {
        private Mock<IVehicleRepository> _repositoryMock;
        private IVehicleService _service;

        [SetUp]
        public void Setup()
        {
            _repositoryMock = new Mock<IVehicleRepository>();
            
            _service = new VehicleService(_repositoryMock.Object);
        }

        [Test]
        public void GetAll_MappingAndOrderingIsCorrect()
        {
            // Arrange
            var vehicles = new List<DAL.Models.Vehicle>
            {
                new DAL.Models.Vehicle
                {
                    Id = 17,
                    Maker = "Skoda",
                    Model = "Fabia",
                    Year = 2009,
                    Price = 5000,
                    Added = new System.DateTime(2019, 10, 01)
                },
                new DAL.Models.Vehicle
                {
                    Id = 18,
                    Maker = "VW",
                    Model = "Polo",
                    Year = 2008,
                    Price = 6000,
                    Added = new System.DateTime(2018, 05, 01)
                }
            };

            var expectedVehicles = new List<Vehicle>
            {
                new Vehicle
                {
                    Id = 18,
                    Brand = "VW",
                    Model = "Polo",
                    Year = 2008,
                    Price = 6000
                },
                new Vehicle
                {
                    Id = 17,
                    Brand = "Skoda",
                    Model = "Fabia",
                    Year = 2009,
                    Price = 5000
                }
            };

            _repositoryMock.Setup(x => x.Get())
                .Returns(vehicles.AsQueryable());

            // Act
            var result = _service.GetAll();

            // Assert
            result.Should().BeEquivalentTo(expectedVehicles, options => options.WithStrictOrdering());
        }

        [Test]
        public void GetInfo_FilteringAndMappingIsCorrect()
        {
            // Arrange
            const int id = 18;

            var vehicles = new List<DAL.Models.Vehicle>
            {
                new DAL.Models.Vehicle
                {
                    Id = 17
                },
                new DAL.Models.Vehicle
                {
                    Id = 18,
                    Warehouse = new DAL.Models.Warehouse
                    {
                        Id = 2,
                        Name = "Warehouse X",
                        Location = new DAL.Models.Location(15.15, 16.16)
                    }
                }
            };

            var expectedVehicleInfo = new VehicleInfo
            {
                Id = 18,
                WarehouseId = 2,
                WarehouseName = "Warehouse X",
                WarehouseLocation = new Location
                {
                    Latitude = 15.15,
                    Longitude = 16.16
                }
            };

            _repositoryMock.Setup(x => x.Get())
                .Returns(vehicles.AsQueryable());

            // Act
            var result = _service.GetInfo(id);

            // Assert
            result.Should().BeEquivalentTo(expectedVehicleInfo);
        }

        [Test]
        public void GetInfo_NoVehicleFound()
        {
            // Arrange
            const int id = 177;

            var vehicles = new List<DAL.Models.Vehicle>
            {
                new DAL.Models.Vehicle
                {
                    Id = 17
                },
                new DAL.Models.Vehicle
                {
                    Id = 18
                }
            };

            _repositoryMock.Setup(x => x.Get())
                .Returns(vehicles.AsQueryable());

            // Act
            var result = _service.GetInfo(id);

            // Assert
            Assert.IsNull(result);
        }
    }
}