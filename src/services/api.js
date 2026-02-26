// Configuración de la URL base del backend
// Cambiar esta URL cuando Railway proporcione el dominio
const API_BASE_URL = 'http://localhost:8000';

// Función auxiliar para hacer peticiones
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Endpoints del backend

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  }).then(res => res.json());
};

export const generarAres = async () => {
  return fetchAPI('/generar-ares', {
    method: 'POST',
  });
};

export const validarAres = async () => {
  return fetchAPI('/validar-ares', {
    method: 'POST',
  });
};

export const ajustarAres = async () => {
  return fetchAPI('/ajustar-ares', {
    method: 'POST',
  });
};

export const generarZores = async () => {
  return fetchAPI('/generar-zores', {
    method: 'POST',
  });
};

export const exportar = async () => {
  return fetchAPI('/exportar', {
    method: 'GET',
  });
};

// Función para cambiar la URL base del backend
export const setBackendURL = (url) => {
  API_BASE_URL = url;
};
