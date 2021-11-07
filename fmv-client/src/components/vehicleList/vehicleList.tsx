import React from 'react';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicleService';
import { VehicleElement } from '../vehicleElement/vehicleElement';
import './vehicleList.css';

export namespace VehicleListComponent {
    export interface Props {
        setLoaderVisibility(visibility: boolean): void;
    }

    export interface State {
        vehicleList: Vehicle[];
    }
}

export class VehicleList extends React.Component<VehicleListComponent.Props, VehicleListComponent.State> {
    constructor(props: VehicleListComponent.Props) {
        super(props);

        this.state = { vehicleList: [] };
    }

    private setLoaderVisibility(visibility: boolean): void {
        this.props.setLoaderVisibility(visibility);
    }

    private getList(): Promise<Vehicle[]> {
        const service = new VehicleService();
        this.setLoaderVisibility(true);

        try {
            return service.getVehicleList();
        } catch {
            this.setLoaderVisibility(false);
        }

        return Promise.resolve([]);
    }

    private renderListHeader(): JSX.Element {
        return (
            <div className="header-row row">
                <div className="cell">Brand</div>
                <div className="cell">Model</div>
                <div className="cell">Year</div>
                <div className="cell">Price</div>
            </div>
        );
    }

    public componentDidMount(): void {
        this.getList().then(vehicleList => {
            this.setState({ vehicleList: vehicleList });
            this.setLoaderVisibility(false);
        });
    }

    public render(): JSX.Element {
        return (
            <div className="vehicle-list container">
                {this.renderListHeader()}
                {this.state.vehicleList.map((vehicle: Vehicle) => <VehicleElement key={vehicle.Id} vehicle={vehicle}></VehicleElement>)}
            </div>
        );
    }
}