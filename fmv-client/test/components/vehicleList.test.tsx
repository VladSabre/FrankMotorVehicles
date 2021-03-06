/// <reference types="jest" />
import * as sinon from 'sinon';
import { render, screen, waitFor } from '@testing-library/react';
import { VehicleList } from '../../src/components/vehicleList/vehicleList';
import { VehicleService } from '../../src/services/vehicleService';
import { Vehicle } from '../../src/models/vehicle';
import '../setupTests';

describe('VehicleList component tests', () => {
    let getVehicleList: sinon.SinonStub;
    let addToCart: sinon.SinonStub;

    beforeEach(() => {
        getVehicleList = sinon.stub(VehicleService.prototype, 'getVehicleList');
        addToCart = sinon.stub();
    });

    afterEach(() => {
        getVehicleList.restore();
    });

    it('column headers rendered and loader callback called', async () => {
        const vehicles: Vehicle[] = [
            {
                Id: 4,
                Brand: 'VW',
                Model: 'Golf',
                Year: 2000,
                Price: 10000.55,
                Licensed: true
            }
        ];

        const setLoaderVisibilitySpy = sinon.spy();

        getVehicleList.resolves(vehicles);

        render(<VehicleList setLoaderVisibility={setLoaderVisibilitySpy} addToCart={addToCart} />);

        expect(screen.queryByText('Brand')).toBeInTheDocument();
        expect(screen.queryByText('Model')).toBeInTheDocument();
        expect(screen.queryByText('Year')).toBeInTheDocument();
        expect(screen.queryByText('Price')).toBeInTheDocument();

        await waitFor(() => expect(getVehicleList.calledOnce).toBe(true));
        await waitFor(() => expect(setLoaderVisibilitySpy.calledTwice).toBe(true));
    });

    it('callback throw an error ', async () => {
        const setLoaderVisibilitySpy = sinon.spy();

        getVehicleList.throws();

        render(<VehicleList setLoaderVisibility={setLoaderVisibilitySpy} addToCart={addToCart} />);

        expect(screen.queryByText('Brand')).toBeInTheDocument();
        expect(screen.queryByText('Model')).toBeInTheDocument();
        expect(screen.queryByText('Year')).toBeInTheDocument();
        expect(screen.queryByText('Price')).toBeInTheDocument();

        await waitFor(() => expect(getVehicleList.calledOnce).toBe(true));
        await waitFor(() => expect(setLoaderVisibilitySpy.calledTwice).toBe(true));
    });
});
