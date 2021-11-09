import React from 'react';
import { AddedVehicle } from '../../models/addedVehicle';
import { Vehicle } from '../../models/vehicle';
import { VehicleElement } from '../vehicleElement/vehicleElement';
import { VehicleService } from '../../services/vehicleService';
import './vehicleList.scss';

export namespace VehicleListComponent {
    export interface Props {
        setLoaderVisibility(visibility: boolean): void;
        addToCart(addedVehicle: AddedVehicle): void;
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
            return Promise.resolve([]);
        }
    }

    private renderListHeader(baseClass: string): JSX.Element {
        return (
            <div className={`${baseClass}_header-row row`}>
                <div className={`${baseClass}_cell cell`}>Brand</div>
                <div className={`${baseClass}_cell cell`}>Model</div>
                <div className={`${baseClass}_cell cell`}>Year</div>
                <div className={`${baseClass}_cell cell`}>Price</div>
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
        const baseClass = "vehicle-list";
        return (
            <div className={`${baseClass} container`}>
                {this.renderListHeader(baseClass)}
                {this.state.vehicleList.map((vehicle: Vehicle) =>
                    <VehicleElement
                        key={vehicle.Id}
                        vehicle={vehicle}
                        addToCart={this.props.addToCart}
                    />
                )}
            </div>
        );
    }
}