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

    private async getList(): Promise<Vehicle[]> {
        const service = new VehicleService();
        this.setLoaderVisibility(true);

        try {
            const list = await service.getVehicleList();
            this.setLoaderVisibility(false);
            return list;
        } catch {
            this.setLoaderVisibility(false);
        }

        return [];
    }

    private renderListHeader(blockClass: string): JSX.Element {
        return (
            <div className={`${blockClass}_header-row`}>
                <div className={`${blockClass}_cell`}>Brand</div>
                <div className={`${blockClass}_cell`}>Model</div>
                <div className={`${blockClass}_cell`}>Year</div>
                <div className={`${blockClass}_cell`}>Price</div>
            </div>
        );
    }

    public async componentDidMount(): Promise<void> {
        const vehicleList = await this.getList();
        this.setState({ vehicleList: vehicleList });
    }

    public render(): JSX.Element {
        const blockClass = "vehicle-list";
        return (
            <div className={blockClass}
            // ref={this.setVehicleListRef}
            >
                {this.renderListHeader(blockClass)}
                {this.state.vehicleList.map((vehicle: Vehicle) => <VehicleElement vehicle={vehicle}></VehicleElement>)}
            </div>
        );
    }
}