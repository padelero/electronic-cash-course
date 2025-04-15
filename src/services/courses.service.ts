
import { apiService } from './api.service';
import { API_CONFIG } from '../config/api.config';

export interface Course {
  id: number;
  title: string;
  description: string;
  image?: string;
  price: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  published: boolean;
}

class CoursesService {
  async getAllCourses(): Promise<Course[]> {
    const response = await apiService.get<Course[]>(API_CONFIG.ENDPOINTS.COURSES);
    return response.success ? response.data : [];
  }

  async getCourseById(id: number): Promise<Course | null> {
    const response = await apiService.get<Course>(`${API_CONFIG.ENDPOINTS.COURSES}/${id}`);
    return response.success ? response.data : null;
  }

  async createCourse(courseData: Omit<Course, 'id'>): Promise<Course | null> {
    const response = await apiService.post<Course>(API_CONFIG.ENDPOINTS.COURSES, courseData);
    return response.success ? response.data : null;
  }

  async updateCourse(id: number, courseData: Partial<Course>): Promise<Course | null> {
    const response = await apiService.put<Course>(`${API_CONFIG.ENDPOINTS.COURSES}/${id}`, courseData);
    return response.success ? response.data : null;
  }

  async deleteCourse(id: number): Promise<boolean> {
    const response = await apiService.delete<{ success: boolean }>(`${API_CONFIG.ENDPOINTS.COURSES}/${id}`);
    return response.success;
  }
}

export const coursesService = new CoursesService();
