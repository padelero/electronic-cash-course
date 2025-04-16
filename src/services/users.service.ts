
import { apiService } from './api.service';
import { API_CONFIG } from '../config/api.config';
import { User } from '../types';

class UsersService {
  async getAllUsers(): Promise<User[]> {
  const endpoint = `${API_CONFIG.ENDPOINTS.USERS}/get.php`;
  const response = await apiService.get<User[]>(endpoint);
  console.log("Respuesta de getAllUsers:", response);
  return response.success ? response.data : [];
}

async getUserById(id: string): Promise<User | null> {
  const endpoint = `${API_CONFIG.ENDPOINTS.USERS}/get.php?id=${id}`;
  const response = await apiService.get<User>(`${endpoint}`);
  console.log(`Respuesta de getUserById(${id}):`, response);
  return response.success ? response.data : null;
}

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User | null> {
    console.log("Creando nuevo usuario:", userData);
    const response = await apiService.post<User>(API_CONFIG.ENDPOINTS.USERS, userData);
    console.log("Respuesta de createUser:", response);
    return response.success ? response.data : null;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    console.log(`Actualizando usuario ${id}:`, userData);
    const response = await apiService.put<User>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`, userData);
    console.log(`Respuesta de updateUser(${id}):`, response);
    return response.success ? response.data : null;
  }

  async deleteUser(id: string): Promise<boolean> {
    console.log(`Eliminando usuario con ID: ${id}`);
    const response = await apiService.delete<{ success: boolean }>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`);
    console.log(`Respuesta de deleteUser(${id}):`, response);
    return response.success;
  }
}

export const usersService = new UsersService();
