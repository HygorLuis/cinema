import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filme } from '../models/filme.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  private readonly API = 'http://localhost:3000/filmes';

  constructor(private httpCliente: HttpClient) { }

  listar(): Observable<Filme[]> {
    return this.httpCliente.get<Filme[]>(this.API);
  }

  buscar(id: number): Observable<Filme> {
    return this.httpCliente.get<Filme>(`${this.API}/${id}`);
  }
}
