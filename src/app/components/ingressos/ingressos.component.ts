import { Component, Input } from '@angular/core';
import { Filme } from '../../models/filme.model';
import { Poltrona } from '../../models/poltrona.model';
import { Ingresso } from '../../models/ingresso.model';

@Component({
  selector: 'app-ingressos',
  templateUrl: './ingressos.component.html',
  styleUrl: './ingressos.component.scss'
})
export class IngressosComponent {
  @Input() filmeSelecionado!: Filme;
  @Input() poltronasSelecionadas: Poltrona[] = [];
  @Input() ingressos!: Ingresso;
}
