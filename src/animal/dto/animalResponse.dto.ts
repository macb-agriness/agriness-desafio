export class AnimalResponseDto {
  constructor(
    private readonly codigo: number,
    private readonly nome: string,
    private readonly codigoLote: number,
    private readonly nomeLote: string) {}
}