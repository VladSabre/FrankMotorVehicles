/// <reference types="jest" />
import * as sinon from 'sinon';
import { render, screen, waitFor } from '@testing-library/react';
import { VehicleElement } from '../../src/components/vehicleElement/vehicleElement';
import { VehicleService } from '../../src/services/vehicleService';
import { VehicleInfo } from '../../src/models/vehicleInfo';
import { Vehicle } from '../../src/models/vehicle';
import userEvent from '@testing-library/user-event';
import '../setupTests';

describe('VehicleElement component tests', () => {
    let getVehicleInfo: sinon.SinonStub;
    let addToCart: sinon.SinonStub;

    beforeEach(() => {
        addToCart = sinon.stub();
    });

    it('columns rendered', async () => {
        const key = 4;

        const vehicle: Vehicle = {
            Id: key,
            Brand: 'VW',
            Model: 'Golf',
            Year: 2000,
            Price: 10000.55,
            Licensed: true
        }

        render(<VehicleElement key={key} vehicle={vehicle} addToCart={addToCart} />);

        expect(screen.queryByText(vehicle.Brand)).toBeInTheDocument();
        expect(screen.queryByText(vehicle.Model)).toBeInTheDocument();
        expect(screen.queryByText(vehicle.Year)).toBeInTheDocument();
        expect(screen.queryByText(vehicle.Price)).toBeInTheDocument();
    });

    it('expand additinal info button displayed', async () => {
        const key = 4;

        const vehicleInfoResponse: VehicleInfo = {
            Id: key,
            WarehouseId: 2,
            WarehouseName: 'Warehouse X',
            WarehouseLocation: { Latitude: 11.11, Longitude: 22.22 }
        };

        const vehicle: Vehicle = {
            Id: key,
            Brand: 'VW',
            Model: 'Golf',
            Year: 2000,
            Price: 10000.55,
            Licensed: true
        }

        getVehicleInfo = sinon.stub(VehicleService.prototype, 'getVehicleInfo');
        getVehicleInfo.resolves(vehicleInfoResponse);

        render(<VehicleElement key={key} vehicle={vehicle} addToCart={addToCart} />);

        expect(screen.getByText('More...')).toBeInTheDocument();
        userEvent.click(screen.getByText('More...'));

        await waitFor(() => expect(getVehicleInfo.calledOnce).toBe(true));

        expect(screen.queryByText(`Located in ${vehicleInfoResponse.WarehouseName}`)).toBeInTheDocument();

        getVehicleInfo.restore();
    });

    it('expand additinal info is not button displayed', async () => {
        const key = 4;

        const vehicle: Vehicle = {
            Id: key,
            Brand: 'VW',
            Model: 'Golf',
            Year: 2000,
            Price: 10000.55,
            Licensed: false
        }

        render(<VehicleElement key={key} vehicle={vehicle} addToCart={addToCart} />);

        expect(screen.queryByText('More...')).toBeNull();
    });
});
