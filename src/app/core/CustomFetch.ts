// src/core/CustomApi.ts
const BASE_URL = 'http://localhost:3000/api';

const CustomFetch = async (endpoint: string, method: string = 'GET', data: any = null, headers = {}) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: data ? JSON.stringify(data) : null,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Custom API error:', error);
        throw error;
    }
};

export default CustomFetch;