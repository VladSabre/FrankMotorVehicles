namespace FrankMotorVehicles.API.Models
{
    public class Response<TData>
    {
        public bool Success { get; set; }

        public string ErrorMessage { get; set; }

        public TData Data { get; set; }
    }
}
