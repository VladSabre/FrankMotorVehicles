import React from 'react';
import { Vehicle } from '../../models/vehicle';

export namespace VehicleElementComponent {
    export interface Props {
        vehicle: Vehicle;
    }

    // export interface State {
    //     isExtended: boolean;
    // }
}

export class VehicleElement extends React.Component<VehicleElementComponent.Props/*, VehicleElementComponent.State*/> {
    constructor(props: VehicleElementComponent.Props) {
        super(props);
    }

    private renderdElement(blockClass: string): JSX.Element {
        return (
            <div className={`${blockClass}_row`}>
                <div className={`${blockClass}_cell`}>{this.props.vehicle.Brand}</div>
                <div className={`${blockClass}_cell`}>{this.props.vehicle.Model}</div>
                <div className={`${blockClass}_cell`}>{this.props.vehicle.Year}</div>
                <div className={`${blockClass}_cell`}>{this.props.vehicle.Price}</div>
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
        const blockClass = "vehicle-element";

        return (
            <div className={blockClass}>
                {this.renderdElement(blockClass)}
            </div>
        );
    }
}