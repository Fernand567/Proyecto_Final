// cajas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CajasService {
  private apiUrl = 'http://localhost:3000/cajas'; // Reemplaza 'URL_DEL_BACKEND' con la URL real de tu backend

  constructor(private http: HttpClient) {}

  obtenerCajas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
