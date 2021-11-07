import { Vehicle } from "../models/vehicle";
import { ApiService } from "./apiService";

export class VehicleService {
    private readonly apiService: ApiService;

    public constructor() {
        this.apiService = new ApiService();
    }

    public getVehicleList(): Promise<Vehicle[]> {
        return this.apiService.get<Vehicle[]>('Vehicle');
    }
}