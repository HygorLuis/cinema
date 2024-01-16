import { Component, Input, OnInit, Output } from '@angular/core';
import { Poltrona } from '../../../models/poltrona.model';
import { Lado } from '../../../enums/lado';
import { SalaService } from '../../../services/sala.service';
import { Sala } from '../../../models/sala.model';
import { Filme } from '../../../models/filme.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FilmeService } from '../../../services/filme.service';

@Component({
  selector: 'app-sala1',
  templateUrl: './sala1.component.html',
  styleUrl: './sala1.component.scss',
})
export class Sala1Component implements OnInit {
  salas: Sala[] = [];
  poltronasEsquerda: Poltrona[] = [];
  poltronasDireito: Poltrona[] = [];
  @Input() poltronasSelecionadas: Poltrona[] = [];
  filme!: Filme;

  constructor(private salaService: SalaService, private filmeService: FilmeService, private route: ActivatedRoute) {
    salaService.listar().subscribe({
      next: (value) => {
        this.salas = value;

        if (this.salas.length == 0) {
          this.criarSala();
        }

        this.carregarPoltronas();
      },
      error: (erro) => {},
      complete: () => {}
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
       this.filmeService.buscar(Number.parseInt(params.get('idFilme') as string)).subscribe(values => {
        this.filme = values;
       });
    });
  }

  criarSala(): void {
    const sala = new Sala();
    const poltronasEsquerdas = this.criarPoltronas(72, Lado.Esquerdo);
    const poltronasDireitas = this.criarPoltronas(72, Lado.Direito);

    sala.poltronas = poltronasEsquerdas.concat(poltronasDireitas);

    this.salaService.criar(sala).subscribe();
  }

  criarPoltronas(qtdPoltronas: number, lado: Lado): Poltrona[] {
    const poltronas: Poltrona[] = [];

    for (let numeroPoltrona = 1; numeroPoltrona <= qtdPoltronas; numeroPoltrona++) {
      poltronas.push(new Poltrona(numeroPoltrona, lado, true));
    }

    return poltronas;
  }

  carregarPoltronas(): void {
    this.salaService.listar().subscribe({
      next: (values) => {
        const sala = values.find(x => x.id == 1) as Sala;

        this.poltronasEsquerda = sala.poltronas.filter(x => x.lado == Lado.Esquerdo);
        this.poltronasDireito= sala.poltronas.filter(x => x.lado == Lado.Direito);
      },
      error: (erro) => console.error(erro),
      complete: () => console.info('poltronas carregadas')
    })
  }

  selecionarPoltrona(poltronaSelecionada: Poltrona): void {
    if (!this.verificarSelecaoPoltrona(poltronaSelecionada)) {
      this.poltronasSelecionadas.push(poltronaSelecionada);
    } else {
      const index = this.poltronasSelecionadas.findIndex(x => x.numero === poltronaSelecionada.numero && x.lado === poltronaSelecionada.lado);

      if (index !== -1) {
        this.poltronasSelecionadas.splice(index, 1);
      }
    }
  }

  verificarSelecaoPoltrona(poltrona: Poltrona): boolean {
    return this.poltronasSelecionadas.some(x => x.numero === poltrona.numero && x.lado === poltrona.lado);
  }
}
