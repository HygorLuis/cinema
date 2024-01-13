import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sala } from '../models/sala.model';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  private readonly API = 'http://localhost:3000/salas';

  constructor(private httpCliente: HttpClient) { }

  criar(sala: Sala): Observable<Sala> {
    return this.httpCliente.post<Sala>(this.API, sala);
  }

  listar(): Observable<Sala[]> {
    return this.httpCliente.get<Sala[]>(this.API);
  }
}
