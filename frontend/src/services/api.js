
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');

const request = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Unable to connect to server', { cause: error });
  }
};

export const analyzeInput = (payload) =>
  request('/analysis', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const getHistory = () =>
  request('/history');

export const getAnalysisById = (id) =>
  request(`/history/${id}`);

export const deleteAnalysis = (id) =>
  request(`/history/${id}`, {
    method: 'DELETE',
  });
