import React from 'react';
import { Vehicle } from '../../models/vehicle';
import './vehicleElement.css';

export namespace VehicleElementComponent {
    export interface Props {
        key: number;
        vehicle: Vehicle;
    }

    // export interface State {
    //     isExtended: boolean;
    // }
}

export class VehicleElement extends React.Component<VehicleElementComponent.Props/*, VehicleElementComponent.State*/> {
    // constructor(props: VehicleElementComponent.Props) {
    //     super(props);
    // }

    private renderdElement(): JSX.Element {
        return (
            <div className="row">
                <div className="cell">{this.props.vehicle.Brand}</div>
                <div className="cell">{this.props.vehicle.Model}</div>
                <div className="cell">{this.props.vehicle.Year}</div>
                <div className="cell">{this.props.vehicle.Price}</div>
            </div>
        );
    }

    // private renderExtendedElement(): JSX.Element {
    //     return (
    //         <div>

    //         </div>
    //     );
    // }

    public render(): JSX.Element {
        return (
            <div className="vehicle-element">
                {this.renderdElement()}
            </div>
        );
    }
}