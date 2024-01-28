import { Poltrona } from "./poltrona.model";

export class Ingresso {
  id: number = 0;
  qtdIngressos: number = 0;
  poltronas: Poltrona[] = [];
  valor: number = 0;

  private readonly valorPoltronas: number = 24.50;

  adicionar(poltronasSelecionadas: Poltrona[]) {
    this.qtdIngressos++;
    this.poltronas = poltronasSelecionadas;
    this.valor = this.valorPoltronas * this.qtdIngressos;
  }

  remover(poltronasSelecionadas: Poltrona[]) {
    this.qtdIngressos--;
    this.poltronas = poltronasSelecionadas;
    this.valor = this.valorPoltronas * this.qtdIngressos;
  }
}
