export function assertNetworkCall(urlToCheck: string,
    method: string,
    abortSignal?: AbortSignal
): void {
    const expectedHeaders: Headers = new Headers({
        'Accept': 'application/json'
    });

    const expectedRequestParameters = {
        method: method,
        headers: expectedHeaders,
        signal: abortSignal
    } as any;

    expect(window.fetch).toBeCalledWith(`${process.env.REACT_APP_API_URL}${urlToCheck}`, expectedRequestParameters);
}

export function getResolvedFetchMock(data: string): jest.Mock {
    return jest.fn().mockImplementation(() => {
        const p = new Promise(resolve => {
            resolve({
                ok: true,
                text: function () {
                    return Promise.resolve(data);
                },
                json: function () {
                    return Promise.resolve(JSON.parse(data));
                }
            });
        });

        return p;
    });
}
