import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserI } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/admin-page'; // Reemplaza 'URL_DEL_BACKEND' con la URL de tu backend

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`);
  }

  getUserById(userId: string): Observable<UserI> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get<UserI>(url);
  }

  updateUser(userId: string, userData: UserI): Observable<UserI> {
    const url = `${this.apiUrl}/users/${userId}`; // URL para la actualización del usuario
    return this.http.put<UserI>(url, userData);
  }
  
  getUserInfo(): Observable<any> {
    return this.http.get<any>('/api/user-info'); // Reemplaza '/api/user-info' con la URL de tu endpoint para obtener la información del usuario autenticado
  }

}
