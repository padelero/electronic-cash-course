
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
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthToken()
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const jsonData: ApiResponse<T> = await response.json();
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
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthToken()
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const jsonData: ApiResponse<T> = await response.json();
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
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthToken()
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const jsonData: ApiResponse<T> = await response.json();
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
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthToken()
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const jsonData: ApiResponse<T> = await response.json();
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
    // Aquí recuperamos el token de autenticación del local storage
    // En una implementación real, tendrías tu propia lógica para gestionar tokens
    const token = localStorage.getItem('auth_token');
    return token ? `Bearer ${token}` : '';
  }
}

export const apiService = new ApiService();
