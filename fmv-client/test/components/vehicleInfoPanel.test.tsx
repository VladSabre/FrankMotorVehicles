/// <reference types="jest" />
import * as sinon from 'sinon';
import { render, screen, waitFor } from '@testing-library/react';
import { AddedVehicle } from '../../src/models/addedVehicle';
import { VehicleInfoPanel } from '../../src/components/vehicleInfo/vehicleInfoPanel';
import { VehicleInfo } from '../../src/models/vehicleInfo';
import { Vehicle } from '../../src/models/vehicle';
import userEvent from '@testing-library/user-event';
import '../setupTests';

describe('VehicleInfoPanel component tests', () => {
    let addToCart: sinon.SinonStub;

    beforeEach(() => {
        addToCart = sinon.stub();
    });

    it('info rendered', async () => {
        const id = 4;

        const vehicleInfo: VehicleInfo = {
            Id: id,
            WarehouseId: 2,
            WarehouseName: 'Warehouse X',
            WarehouseLocation: { Latitude: 11.11, Longitude: 22.22 }
        };

        const vehicle: Vehicle = {
            Id: id,
            Brand: 'VW',
            Model: 'Golf',
            Year: 2000,
            Price: 10000.55,
            Licensed: true
        }

        const description = `Located in ${vehicleInfo.WarehouseName}`;
        const location = `Coordinates are ${vehicleInfo.WarehouseLocation.Latitude}, ` +
            vehicleInfo.WarehouseLocation.Longitude;

        render(<VehicleInfoPanel vehicleInfo={vehicleInfo} vehicle={vehicle} addToCart={addToCart} />);

        expect(screen.queryByText(description)).toBeInTheDocument();
        expect(screen.queryByText(location)).toBeInTheDocument();
        expect(screen.getByTitle('add-to-cart')).toBeInTheDocument();
    });

    it('addToCart called on click', async () => {

        const id = 4;

        const vehicleInfo: VehicleInfo = {
            Id: id,
            WarehouseId: 2,
            WarehouseName: 'Warehouse X',
            WarehouseLocation: { Latitude: 11.11, Longitude: 22.22 }
        };

        const vehicle: Vehicle = {
            Id: id,
            Brand: 'VW',
            Model: 'Golf',
            Year: 2015,
            Price: 20000.55,
            Licensed: true
        }

        const addedVehicle: AddedVehicle = {
            Id: id,
            Car: '\'15 VW Golf',
            Price: 20000.55
        }

        render(<VehicleInfoPanel vehicleInfo={vehicleInfo} vehicle={vehicle} addToCart={addToCart} />);

        userEvent.click(screen.getByTitle('add-to-cart'));

        await waitFor(() => expect(addToCart.withArgs(addedVehicle).calledOnce).toBe(true));
    });
});
