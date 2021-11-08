import { ApiService } from '../../src/services/apiService';
import { ApiResponse } from '../../src/models/apiResponse';
import { assertNetworkCall, getResolvedFetchMock } from '../serviceTestUtils';

describe('ApiService tests', () => {
    let apiService: ApiService;

    function getApiResponseFetchMock(success: boolean, errorMessage?: string, data?: any): jest.Mock {
        const apiResponse: ApiResponse<any> = {
            Success: success,
            ErrorMessage: errorMessage,
            Data: data
        };

        return getResolvedFetchMock(JSON.stringify(apiResponse));
    }

    beforeEach(() => {
        apiService = new ApiService();

    });

    describe('Success: true', () => {
        beforeEach(() => {
            window.fetch = getApiResponseFetchMock(true);
        });

        it('get - check request parameters', async () => {
            // Arrange
            Date.now = jest.fn(() => 1607091414676);
            const url = 'test';
            const expectedUrl = url + `?_=${Date.now()}`;
            const abortController = new AbortController();

            // Act
            await apiService.get(url, abortController.signal);

            //Assert
            assertNetworkCall(expectedUrl, 'GET', abortController.signal);
        });
    });

    describe('Success: false', () => {
        const errorMessage = 'errorMessage';

        beforeEach(() => {
            window.fetch = getApiResponseFetchMock(false, errorMessage);
        });

        it('get - check request parameters', async () => {
            // Arrange
            const url = 'test';
            const abortController = new AbortController();

            // Act
            const action = apiService.get(url, abortController.signal);

            //Assert
            await expect(action).rejects.toThrow(errorMessage);
        });
    });
});
