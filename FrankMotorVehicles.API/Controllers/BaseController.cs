using FrankMotorVehicles.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace FrankMotorVehicles.API.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected Response<T> Ok<T>(T data)
        {
            return new Response<T>
            {
                Success = true,
                Data = data
            };
        }

        protected Response<T> NotFound<T>()
        {
            return new Response<T>
            {
                Success = false,
                ErrorMessage = "Not found"
            };
        }
    }
}
