import { Component } from '@angular/core';
import { FilmeService } from '../../services/filme.service';
import { Filme } from '../../models/filme.model';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrl: './filmes.component.scss'
})

export class FilmesComponent {

  filmes: Filme[] = [];

  constructor(private filmeService: FilmeService) {
    filmeService.listar().subscribe({
      next: (values) => {
        this.filmes = values;
      },
      error: () => {},
      complete: () => {}
    });
  }
}
