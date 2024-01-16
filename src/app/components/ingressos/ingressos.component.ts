import { Component, Input } from '@angular/core';
import { Filme } from '../../models/filme.model';

@Component({
  selector: 'app-ingressos',
  templateUrl: './ingressos.component.html',
  styleUrl: './ingressos.component.scss'
})
export class IngressosComponent {

  @Input() filmeSelecionado!: Filme;

}
