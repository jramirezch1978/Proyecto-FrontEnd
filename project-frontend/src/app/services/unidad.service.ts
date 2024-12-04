// src/app/services/unidad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UnidadDTO} from '../dto/UnidadDTO'

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private baseUrl = 'http://localhost:8080/api/unidades';

  constructor(private http: HttpClient) { }

  getAll(): Observable<UnidadDTO[]> {
    return this.http.get<UnidadDTO[]>(`${this.baseUrl}/`);
  }

  getById(id: number): Observable<UnidadDTO> {
    return this.http.get<UnidadDTO>(`${this.baseUrl}/${id}`);
  }

  create(unidad: UnidadDTO): Observable<UnidadDTO> {
    return this.http.post<UnidadDTO>(`${this.baseUrl}/`, unidad);
  }

  update(unidad: UnidadDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/`, unidad);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  activar(unidad: UnidadDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/activarUnidad`, unidad);
  }

  desactivar(unidad: UnidadDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/desactivarUnidad`, unidad);
  }
}