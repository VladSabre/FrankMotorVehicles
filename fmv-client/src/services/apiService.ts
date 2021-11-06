export class ApiService {
    public constructor() {
        if (!(<any>window).fetchActive) {
            (<any>window).fetchActive = 0;
        }
    }

    // public get<TResponse>(url: string, abortSignal?: AbortSignal): Promise<TResponse> {

    // }
}