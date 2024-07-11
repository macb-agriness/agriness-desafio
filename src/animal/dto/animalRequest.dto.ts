import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class AnimalRequestDto {

  @IsInt( { message:
      'O código do animal deve ser um número inteiro (sem letras, aspas ou valores decimais)' })
  @IsNotEmpty( { message:
      'O código do animal não foi informado' })
  codigo: number;

  @IsString( { message:
      'O nome do animal deve ser uma string (entre aspas)' })
  @IsNotEmpty( { message:
      'O nome do animal não foi informado' })
  nome: string;

  @IsInt( { message:
      'O código do lote deve ser um número inteiro (sem letras, aspas ou valores decimais)' })
  @IsNotEmpty( { message:
      'O código do lote não foi informado' })
  codigoLote: number;
}