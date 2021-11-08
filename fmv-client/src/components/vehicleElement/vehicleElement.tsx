import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Vehicle } from '../../models/vehicle';
import { VehicleInfo } from '../../models/vehicleInfo';
import { VehicleService } from '../../services/vehicleService';
import './vehicleElement.scss';

export namespace VehicleElementComponent {
    export interface Props {
        vehicle: Vehicle;
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

    private renderdElement(baseClass: string): JSX.Element {
        return (
            <div className={`${baseClass}_row row`}>
                <div className={`${baseClass}_cell cell`}>{this.props.vehicle.Brand}</div>
                <div className={`${baseClass}_cell cell`}>{this.props.vehicle.Model}</div>
                <div className={`${baseClass}_cell cell`}>{this.props.vehicle.Year}</div>
                <div className={`${baseClass}_cell cell`}>{this.props.vehicle.Price}</div>
                <div className={`${baseClass}_cell cell`}>
                    <Button variant="secondary" onClick={this.onClick}>
                        More...
                    </Button>
                </div>
            </div>
        );
    }

    private renderExtendedElement(baseClass: string): JSX.Element {
        if (!this.state.isExtended || !this.state.info)
            return (<React.Fragment />);

        return (
            <div className={`${baseClass}_info`}>
                <Card>
                    <Card.Body>Located in {this.state.info.WarehouseName} warehouse</Card.Body>
                </Card>
            </div>
        );
    }

    public render(): JSX.Element {
        const baseClass = "vehicle-element";

        return (
            <div className={`${baseClass}`}>
                {this.renderdElement(baseClass)}
                {this.renderExtendedElement(baseClass)}
            </div>
        );
    }
}