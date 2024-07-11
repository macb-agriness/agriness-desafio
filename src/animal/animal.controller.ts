import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { AnimalRequestDto } from "./dto/animalRequest.dto";
import { v4 as uuid } from "uuid";
import { AnimalEntity } from "./animal.entity";
import { AnimalResponseDto } from "./dto/animalResponse.dto";
import { LoteService } from "../lote/lote.service";

@Controller('animal')
export class AnimalController {

  constructor(private loteService: LoteService) {}



  /**
   * Endpoint para registrar um animal na aplicação
   *
   * @param loteRequestDto
   */
  @Post()
  async create(@Body() animalRequestDto: AnimalRequestDto) {

    const animal = new AnimalEntity();

    animal.uuid = uuid();
    animal.codigo = animalRequestDto.codigo;
    animal.nome = animalRequestDto.nome;
    animal.codigoLote = animalRequestDto.codigoLote;

    await this.loteService.addAnimal(animal);

    return {
      lote: new AnimalResponseDto(
        animal.codigo, animal.nome, animal.codigoLote, ""),
      message: `animal '${animal.nome}' criado com sucesso!`
    };
  }



  /**
   * Endpoint para buscar um animal tomando como parâmetro o código
   *
   * @param codigo
   * @param nome
   */
  @Get('findById/:id')
  async findById(@Param('id', ParseIntPipe) codigoAnimal: number ) {

    const loteAnimal = await this.loteService.findLoteAnimal(codigoAnimal);

    const animal = loteAnimal.findAnimalById(codigoAnimal);

    return new AnimalResponseDto(
        animal.codigo, animal.nome, loteAnimal.codigo, loteAnimal.nome);
  }



  /**
   * Endpoint para excluir um animal dos registros da aplicação
   *
   * @param codigo
   */
  @Delete(':codigo')
  async delete(@Param('codigo', ParseIntPipe) codigo: number) {

    await this.loteService.deleteAnimal(codigo);

    return {
      message: `animal '${codigo}' excluído com sucesso!`
    };
  }
}
