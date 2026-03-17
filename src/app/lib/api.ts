const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('access_token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        if (response.status === 401) {
            // Stub for token refresh logic or logout redirect
            console.warn("Unauthorized API call - redirecting to login");
            localStorage.removeItem('access_token');
            if (window.location.pathname !== '/auth') {
                window.location.href = '/auth';
            }
        }
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || `API error ${response.status}`);
        (error as any).status = response.status;
        (error as any).data = errorData;
        throw error;
    }


    // Handle empty responses
    if (response.status === 204) return null;
    return response.json();
}
