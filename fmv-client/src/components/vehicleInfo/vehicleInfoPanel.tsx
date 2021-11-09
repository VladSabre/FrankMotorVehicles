import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { AddedVehicle } from '../../models/addedVehicle';
import { Vehicle } from '../../models/vehicle';
import { VehicleInfo } from '../../models/vehicleInfo';
import './vehicleInfoPanel.scss';

export namespace VehicleInfoPanelComponent {
    export interface Props {
        vehicleInfo: VehicleInfo;
        vehicle: Vehicle;
        addToCart(Id: AddedVehicle): void;
    }
}

export class VehicleInfoPanel extends React.Component<VehicleInfoPanelComponent.Props> {
    constructor(props: VehicleInfoPanelComponent.Props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    private onClick(): void {
        const shortYear = this.props.vehicle.Year.toString().substring(2);
        const addedVehicle = {
            Id: this.props.vehicleInfo.Id,
            Car: `'${shortYear} ${this.props.vehicle.Brand} ${this.props.vehicle.Model}`,
            Price: this.props.vehicle.Price
        };
        this.props.addToCart(addedVehicle);
    }

    public render(): JSX.Element {
        const baseClass = "vehicle-info-element";
        const description = `Located in ${this.props.vehicleInfo.WarehouseName}`;
        const location = `Coordinates are ${this.props.vehicleInfo.WarehouseLocation.Latitude}, ` +
            this.props.vehicleInfo.WarehouseLocation.Longitude;

        return (
            <div className={`${baseClass} shadow`}>
                <Card>
                    <Card.Body>
                        <ul>
                            <li>{description}</li>
                            <li>{location}</li>
                        </ul>
                        <label className={`${baseClass}_label`}>Add for comparison</label>
                        <Button variant="primary" size="sm" onClick={this.onClick} title="add-to-cart">
                            <FontAwesomeIcon icon={faCartPlus} />
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}