
// Importamos las variables de entorno para usarlas en las configuraciones
// Las variables de entorno se cargan automáticamente por Vite desde .env

export const DB_CONFIG = {
  HOST: import.meta.env.DB_HOST || '195.35.53.21',
  PORT: import.meta.env.DB_PORT || '3306',
  USER: import.meta.env.DB_USER || 'u877712588_crypto',
  PASSWORD: import.meta.env.DB_PASSWORD || 'jz&$F$M2VW9G#FpzbQ@n',
  NAME: import.meta.env.DB_NAME || 'u877712588_crypto'
};

export const API_CONFIG = {
  // Actualiza esta URL para que apunte a donde hospedarás tus archivos PHP
  BASE_URL: '/api', // En lugar de 'https://padelvalles.com/api'
  ENDPOINTS: {
    COURSES: '/courses',
    USERS: '/users',
    AUTH: '/auth',
    REWARDS: '/rewards',
    STATUS: '/status'
  }
};

