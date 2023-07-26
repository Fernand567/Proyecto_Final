import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  backendUrl: string = 'http://localhost:3000'; // Quita la palabra clave 'const' de aquí

  constructor(private http: HttpClient) {} // Asegúrate de inyectar el HttpClient aquí

  // Resto del código de la clase

  updatePassword(userId: string, newPassword: string): Observable<any> {
    const url = `${this.backendUrl}/update-password/${userId}`;
    const data = { newPassword }; // Enviar la nueva contraseña en el cuerpo de la solicitud
    return this.http.put<any>(url, data);
  }
}

