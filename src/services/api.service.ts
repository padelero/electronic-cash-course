
import { API_CONFIG } from '../config/api.config';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl = API_CONFIG.BASE_URL) {
    this.baseUrl = baseUrl;
    console.log("API Service inicializado con URL base:", this.baseUrl);
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      console.log(`Realizando petición GET a: ${this.baseUrl}${endpoint}`);
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthToken()
        }
      });
      
      if (!response.ok) {
        console.error(`Error en petición GET: ${response.status} - ${response.statusText}`);
        throw new Error(`Error: ${response.status}`);
      }
      
      const jsonData: ApiResponse<T> = await response.json();
      console.log(`Respuesta de GET a ${endpoint}:`, jsonData);
      return jsonData;
    } catch (error) {
      console.error('API GET Error:', error);
      return {
        success: false,
        data: {} as T,
        message: 'Error en la solicitud'
      };
    }
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      console.log(`Realizando petición POST a: ${this.baseUrl}${endpoint}`, data);
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthToken()
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        console.error(`Error en petición POST: ${response.status} - ${response.statusText}`);
        throw new Error(`Error: ${response.status}`);
      }
      
      const jsonData: ApiResponse<T> = await response.json();
      console.log(`Respuesta de POST a ${endpoint}:`, jsonData);
      return jsonData;
    } catch (error) {
      console.error('API POST Error:', error);
      return {
        success: false,
        data: {} as T,
        message: 'Error en la solicitud'
      };
    }
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      console.log(`Realizando petición PUT a: ${this.baseUrl}${endpoint}`, data);
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthToken()
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        console.error(`Error en petición PUT: ${response.status} - ${response.statusText}`);
        throw new Error(`Error: ${response.status}`);
      }
      
      const jsonData: ApiResponse<T> = await response.json();
      console.log(`Respuesta de PUT a ${endpoint}:`, jsonData);
      return jsonData;
    } catch (error) {
      console.error('API PUT Error:', error);
      return {
        success: false,
        data: {} as T,
        message: 'Error en la solicitud'
      };
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      console.log(`Realizando petición DELETE a: ${this.baseUrl}${endpoint}`);
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthToken()
        }
      });
      
      if (!response.ok) {
        console.error(`Error en petición DELETE: ${response.status} - ${response.statusText}`);
        throw new Error(`Error: ${response.status}`);
      }
      
      const jsonData: ApiResponse<T> = await response.json();
      console.log(`Respuesta de DELETE a ${endpoint}:`, jsonData);
      return jsonData;
    } catch (error) {
      console.error('API DELETE Error:', error);
      return {
        success: false,
        data: {} as T,
        message: 'Error en la solicitud'
      };
    }
  }

  private getAuthToken(): string {
    // Recuperamos el token de autenticación del local storage
    const token = localStorage.getItem('auth_token');
    return token ? `Bearer ${token}` : '';
  }
}

export const apiService = new ApiService();
