import { Component, Output } from '@angular/core';
import { Poltrona } from '../../../models/poltrona.model';
import { Lado } from '../../../enums/lado';
import { SalaService } from '../../../services/sala.service';
import { Sala } from '../../../models/sala.model';

@Component({
  selector: 'app-sala1',
  templateUrl: './sala1.component.html',
  styleUrl: './sala1.component.scss',
})
export class Sala1Component {
  salas: Sala[] = [];
  poltronasEsquerda: Poltrona[] = [];
  poltronasDireito: Poltrona[] = [];
  @Output() poltronasSelecionadas: Poltrona[] = [];

  constructor(private service: SalaService) {
    service.listar().subscribe({
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

  criarSala(): void {
    const sala = new Sala();
    const poltronasEsquerdas = this.criarPoltronas(99, Lado.Esquerdo);
    const poltronasDireitas = this.criarPoltronas(99, Lado.Direito);

    sala.poltronas = poltronasEsquerdas.concat(poltronasDireitas);

    this.service.criar(sala).subscribe();
  }

  criarPoltronas(qtdPoltronas: number, lado: Lado): Poltrona[] {
    const poltronas: Poltrona[] = [];

    for (let numeroPoltrona = 1; numeroPoltrona <= qtdPoltronas; numeroPoltrona++) {
      poltronas.push(new Poltrona(numeroPoltrona, lado, true));
    }

    return poltronas;
  }

  carregarPoltronas(): void {
    this.service.listar().subscribe({
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
