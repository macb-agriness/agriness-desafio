import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Unique, UniqueValidator } from "../validation/unique.validator";

export class LoteRequestDto {

  @Unique( { message:
      "Já existe um lote cadastrado com o código informado"})
  @IsInt( { message:
      'O código do lote deve ser um número inteiro (sem letras, aspas ou valores decimais)'})
  @IsNotEmpty( { message:
      'O código do lote não foi informado'})
  codigo: number;

  @Unique( { message:
      "Já existe um lote cadastrado com o nome informado"})
  @IsString( { message:
      'O nome do lote deve ser uma string (entre aspas)'})
  @IsNotEmpty( { message:
      'O nome do lote não foi informado'})
  nome: string;
}