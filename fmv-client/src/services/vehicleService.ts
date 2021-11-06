import { Vehicle } from "../models/vehicle";
// import { ApiService } from "./apiService";

export class VehicleService {
    // private readonly apiService: ApiService;

    public constructor() {
        // this.apiService = new ApiService();
    }

    public getVehicleList(): Vehicle[] {
        return [
            {
                Brand: "Saab",
                Model: "900",
                Year: 1987,
                Price: 8771
            },
            {
                Brand: "Mazda",
                Model: "B-Series",
                Year: 1998,
                Price: 23407.59
            },
            {
                Brand: "GMC",
                Model: "Sierra 3500",
                Year: 2012,
                Price: 5869.23
            }
        ];

        //return this.apiService.get<Vehicle>('Vehicle/Get');
    }
}