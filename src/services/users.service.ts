
import { apiService } from './api.service';
import { API_CONFIG } from '../config/api.config';
import { User } from '../types';

class UsersService {
  async getAllUsers(): Promise<User[]> {
    const response = await apiService.get<User[]>(API_CONFIG.ENDPOINTS.USERS);
    return response.success ? response.data : [];
  }

  async getUserById(id: string): Promise<User | null> {
    const response = await apiService.get<User>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`);
    return response.success ? response.data : null;
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User | null> {
    const response = await apiService.post<User>(API_CONFIG.ENDPOINTS.USERS, userData);
    return response.success ? response.data : null;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    const response = await apiService.put<User>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`, userData);
    return response.success ? response.data : null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const response = await apiService.delete<{ success: boolean }>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`);
    return response.success;
  }
}

export const usersService = new UsersService();
