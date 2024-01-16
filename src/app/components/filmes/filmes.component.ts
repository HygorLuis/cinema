import { Component } from '@angular/core';
import { FilmeService } from '../../services/filme.service';
import { Filme } from '../../models/filme.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrl: './filmes.component.scss'
})

export class FilmesComponent {

  filmes: Filme[] = [];

  constructor(private filmeService: FilmeService, private router: Router) {
    filmeService.listar().subscribe({
      next: (values) => {
        this.filmes = values;
      },
      error: () => {},
      complete: () => {}
    });
  }

  escolherPoltronas(filme: Filme) : void {
    this.router.navigate(['/sala1', filme.id]);
  }
}
