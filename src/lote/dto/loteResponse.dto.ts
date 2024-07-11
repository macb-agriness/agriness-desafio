export class LoteResponseDto {
  constructor(
    private readonly codigo: number,
    private readonly nome: string,
    private readonly codigoAnimalArray: number[]) {}
}