import React from 'react';
import { Button } from 'react-bootstrap';
import { AddedVehicle } from '../../models/addedVehicle';
import { Vehicle } from '../../models/vehicle';
import { VehicleInfo } from '../../models/vehicleInfo';
import { VehicleService } from '../../services/vehicleService';
import { VehicleInfoPanel } from '../vehicleInfo/vehicleInfoPanel';
import './vehicleElement.scss';

export namespace VehicleElementComponent {
    export interface Props {
        vehicle: Vehicle;
        addToCart(addedVehicle: AddedVehicle): void;
    }

    export interface State {
        isExtended: boolean;
        info: VehicleInfo | undefined;
    }
}

export class VehicleElement extends React.Component<VehicleElementComponent.Props, VehicleElementComponent.State> {
    constructor(props: VehicleElementComponent.Props) {
        super(props);

        this.state = { isExtended: false, info: undefined };

        this.onClick = this.onClick.bind(this);
    }

    private getInfo(vehicleId: number): Promise<VehicleInfo> {
        const service = new VehicleService();

        return service.getVehicleInfo(vehicleId);
    }

    private onClick(): void {
        this.getInfo(this.props.vehicle.Id).then(info => {
            this.setState({ info: info, isExtended: true });
        })
    }

    private renderMoreButton(): JSX.Element {
        if (this.props.vehicle.Licensed && !this.state.isExtended)
            return (<Button variant="secondary" onClick={this.onClick}>
                More...
            </Button>)

        return (<React.Fragment />);
    }

    private renderdElement(baseClass: string): JSX.Element {
        const notLicensed = !this.props.vehicle.Licensed ? `${baseClass}_row__not-licensed` : '';
        return (
            <div className={`${baseClass}_row ${notLicensed} row`}>
                <div className={`${baseClass}_cell cell`}>{this.props.vehicle.Brand}</div>
                <div className={`${baseClass}_cell cell`}>{this.props.vehicle.Model}</div>
                <div className={`${baseClass}_cell cell`}>{this.props.vehicle.Year}</div>
                <div className={`${baseClass}_cell cell`}>{this.props.vehicle.Price}</div>
                <div className={`${baseClass}_cell cell`}>{this.renderMoreButton()}</div>
            </div>
        );
    }

    private renderExtendedElement(): JSX.Element {
        if (!this.state.isExtended || !this.state.info)
            return (<React.Fragment />);

        return (<VehicleInfoPanel
            vehicleInfo={this.state.info}
            vehicle={this.props.vehicle}
            addToCart={this.props.addToCart}
        />);
    }

    public render(): JSX.Element {
        const baseClass = "vehicle-element";

        return (
            <div className={`${baseClass}`}>
                {this.renderdElement(baseClass)}
                {this.renderExtendedElement()}
            </div>
        );
    }
}