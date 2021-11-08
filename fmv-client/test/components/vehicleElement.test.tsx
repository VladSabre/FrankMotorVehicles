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

    it('columns rendered', async () => {
        const key = 4;

        const vehicle: Vehicle = {
            Id: key,
            Brand: 'VW',
            Model: 'Golf',
            Year: 2000,
            Price: 10000.55
        }

        render(<VehicleElement key={key} vehicle={vehicle} />);

        expect(screen.queryByText(vehicle.Brand)).toBeInTheDocument();
        expect(screen.queryByText(vehicle.Model)).toBeInTheDocument();
        expect(screen.queryByText(vehicle.Year)).toBeInTheDocument();
        expect(screen.queryByText(vehicle.Price)).toBeInTheDocument();
    });

    it('additinal info displayed', async () => {

        const key = 4;

        const vehicleInfoResponse: VehicleInfo = {
            Id: key,
            WarehouseId: 2,
            WarehouseName: 'Warehouse X'
        };

        const vehicle: Vehicle = {
            Id: key,
            Brand: 'VW',
            Model: 'Golf',
            Year: 2000,
            Price: 10000.55
        }

        getVehicleInfo = sinon.stub(VehicleService.prototype, 'getVehicleInfo');
        getVehicleInfo.resolves(vehicleInfoResponse);

        render(<VehicleElement key={key} vehicle={vehicle} />);

        userEvent.click(screen.getByText('More...'));

        await waitFor(() => expect(getVehicleInfo.calledOnce).toBe(true));

        expect(screen.queryByText(`Located in ${vehicleInfoResponse.WarehouseName} warehouse`)).toBeInTheDocument();

        getVehicleInfo.restore();
    });
});
