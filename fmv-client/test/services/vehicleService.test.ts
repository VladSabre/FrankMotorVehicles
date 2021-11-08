import { waitFor } from '@testing-library/react';
import * as sinon from 'sinon';
import { ApiService } from '../../src/services/apiService';
import { VehicleService } from '../../src/services/vehicleService';

describe('ApiService tests', () => {
    let service: VehicleService;

    let get: sinon.SinonStub;

    beforeEach(() => {
        service = new VehicleService();
        get = sinon.stub(ApiService.prototype, 'get');
    });

    afterEach(() => {
        get.restore();
    });

    it('getVehicleList - dependencies called', async () => {
        // Act
        service.getVehicleList()

        //Assert
        await waitFor(() => expect(get.withArgs('Vehicle').calledOnce).toBe(true));
    });

    it('getVehicleList - dependencies called', async () => {
        // Arrange
        const id = 4;

        // Act
        service.getVehicleInfo(id)

        //Assert
        await waitFor(() => expect(get.withArgs(`Vehicle/${id}`).calledOnce).toBe(true));
    });
});