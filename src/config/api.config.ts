
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
  // Actualizado para usar /api y que el proxy lo reescriba correctamente
  BASE_URL: '/api', 
  ENDPOINTS: {
    COURSES: '/courses',
    USERS: '/users',
    AUTH: '/auth',
    REWARDS: '/rewards',
    STATUS: '/status'
  }
};
