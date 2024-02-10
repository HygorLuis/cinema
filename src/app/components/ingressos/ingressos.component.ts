import { Sala } from './../../models/sala.model';
import { Component, Input } from '@angular/core';
import { Filme } from '../../models/filme.model';
import { Poltrona } from '../../models/poltrona.model';
import { Ingresso } from '../../models/ingresso.model';
import { SalaService } from '../../services/sala.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingressos',
  templateUrl: './ingressos.component.html',
  styleUrl: './ingressos.component.scss'
})
export class IngressosComponent {
  @Input() filmeSelecionado!: Filme;
  @Input() ingressos!: Ingresso;
  @Input() sala!: Sala;

  constructor(private service: SalaService, private router: Router) {}

  comprar(): void {
    this.ingressos.poltronas.forEach(x => {
      const poltrona = this.sala.poltronas.find(y => y.lado == x.lado && y.numero == x.numero);

      if (poltrona) {
        poltrona.disponivel = false;
      }
    });

    console.log(`${JSON.stringify(this.sala.poltronas.filter(x => !x.disponivel))}`);

    this.service.atualizar(this.sala).subscribe({
      next: (values) => alert('Ingressos comprados com sucesso!'),
      error: (erro) => console.error(erro),
      complete: () => {this.router.navigate(['/filmes'])}
    })
  }
}
