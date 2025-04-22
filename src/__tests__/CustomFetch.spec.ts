import CustomFetch from "@/app/core/CustomFetch";

describe('CustomFetch', () => {
    const BASE_URL = 'http://localhost:3000/api';
    const endpoint = '/test-endpoint';
    const mockData = { key: 'value' };
    const mockHeaders = { Authorization: 'Bearer token' };

    beforeEach(() => {
        global.fetch = jest.fn() as jest.Mock;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should make a GET request and return data', async () => {
        const mockResponse = { data: 'test data' };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await CustomFetch(endpoint);
        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: null,
        });
        expect(result).toEqual(mockResponse);
    });

    it('should make a POST request with data and return response', async () => {
        const mockResponse = { data: 'test data' };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await CustomFetch(endpoint, 'POST', mockData, mockHeaders);
        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...mockHeaders,
            },
            body: JSON.stringify(mockData),
        });
        expect(result).toEqual(mockResponse);
    });

    it('should throw an error if the network response is not ok', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await expect(CustomFetch(endpoint)).rejects.toThrow('Network response was not ok');
    });

    it('should handle fetch errors', async () => {
        const mockError = new Error('Fetch error');
        (fetch as jest.Mock).mockRejectedValueOnce(mockError);

        await expect(CustomFetch(endpoint)).rejects.toThrow('Fetch error');
    });
});