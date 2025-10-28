import { trackEvent } from './analytics.js';

export async function mockApiRequest(endpoint, payload) {
    trackEvent('mock_api_request', {
        endpoint,
        payload_size: payload ? JSON.stringify(payload).length : 0
    });

    await new Promise(resolve => setTimeout(resolve, 1200));

    trackEvent('mock_api_success', {
        endpoint
    });

    return {
        ok: true,
        status: 200,
        json: async () => ({ success: true })
    };
}
