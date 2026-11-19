const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');

const request = async (endpoint, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || 20000);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      signal: options.signal || controller.signal,
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
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.', { cause: error });
    }
    throw new Error(error.message || 'Unable to connect to server', { cause: error });
  } finally {
    clearTimeout(timeoutId);
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
