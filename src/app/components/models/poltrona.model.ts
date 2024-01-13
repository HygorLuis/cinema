import { Lado } from "../enums/lado";

export class Poltrona {

  constructor(numero: number, lado: Lado, disponivel = true) {
    this.numero = numero
    this.lado = lado;
    this.disponivel = disponivel;
  }

  numero: number;
  disponivel: boolean;
  lado: Lado;
}
