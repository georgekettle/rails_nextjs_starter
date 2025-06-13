import { toast } from "sonner"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1';

class ApiError extends Error {
  constructor(message, code, details = null, status = 400) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
    this.status = status;
  }
}

async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    // If the server returns an error in our standard format, use it
    if (isJson && data.error) {
      const error = new ApiError(
        data.error.message,
        data.error.code,
        data.error.details,
        response.status
      );
      
      // Show toast for the error
      toast.error(error.message, {
        description: error.details ? Object.values(error.details).flat().join(', ') : undefined,
      });
      
      throw error;
    }
    
    // Otherwise, create a generic error
    throw new ApiError(
      data.message || 'An unexpected error occurred',
      'unexpected_error',
      null,
      response.status
    );
  }

  return data;
}

async function makeRequest(endpoint, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Add authorization header if token exists
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    defaultHeaders['Authorization'] = `Token ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Network error occurred',
      'network_error',
      null,
      500
    );
  }
}

export const apiClient = {
  get: (endpoint) => makeRequest(endpoint, { method: 'GET' }),
  post: (endpoint, data) => makeRequest(endpoint, { method: 'POST', body: data }),
  put: (endpoint, data) => makeRequest(endpoint, { method: 'PUT', body: data }),
  patch: (endpoint, data) => makeRequest(endpoint, { method: 'PATCH', body: data }),
  delete: (endpoint, data = {}) => makeRequest(endpoint, { method: 'DELETE', body: data }),
};

export { ApiError }; 