import { ApiResponse } from '../models/apiResponse';

export class ApiService {
    public constructor() {
        if (!(<any>window).fetchActive) {
            (<any>window).fetchActive = 0;
        }
    }

    public get<TResponse>(url: string, abortSignal?: AbortSignal): Promise<TResponse> {
        const requestOptions = this.getRequestOptions(abortSignal);
        requestOptions.method = 'GET';

        return this.fetchAsJson<TResponse>(`${url}?_=${Date.now()}`, requestOptions);
    }

    private getRequestOptions(abortSignal?: AbortSignal): RequestInit {
        const headers = new Headers({
            'Accept': 'application/json'
        });

        return {
            //credentials: 'include',
            headers: headers,
            signal: abortSignal
        };
    }

    private async fetchAsJson<TResponse>(url: string, requestOptions: RequestInit): Promise<TResponse> {
        const response = await this.fetchInternal(url, requestOptions);

        let parsedResponse: ApiResponse<TResponse>;

        try {
            parsedResponse = await response.json() as ApiResponse<TResponse>;
        } catch (error) {
            parsedResponse = {} as ApiResponse<any>;
        }

        if (!parsedResponse.Success) {
            throw new Error(parsedResponse.ErrorMessage);
        }

        return parsedResponse.Data;
    }

    private async fetchInternal(url: string, requestOptions: RequestInit): Promise<Response> {
        (<any>window).fetchActive++;

        try {
            return await fetch(`${process.env.REACT_APP_API_URL}${url}`, requestOptions);
        } catch (error: any) {
            if (error.name === 'TypeError' && !window.navigator.onLine) {
                throw new Error('A fetch error');
            }
            throw error;
        } finally {
            (<any>window).fetchActive--;
        }
    }
}