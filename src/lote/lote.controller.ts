import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseInterceptors } from "@nestjs/common";
import { LoteRequestDto } from "./dto/loteRequest.dto";
import { LoteEntity } from "./lote.entity";
import { v4 as uuid } from "uuid";
import { LoteResponseDto } from "./dto/loteResponse.dto";
import { LoteService } from "./lote.service";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Controller("lote")
@UseInterceptors(CacheInterceptor)
export class LoteController {

  constructor(private loteService: LoteService) {}



  /**
   * Endpoint para registrar um lote na aplicação
   *
   * @param loteRequestDto
   */
  @Post()
  async create(@Body() loteRequestDto: LoteRequestDto) {

    const loteEntity = new LoteEntity();

    loteEntity.uuid = uuid();
    loteEntity.codigo = loteRequestDto.codigo;
    loteEntity.nome = loteRequestDto.nome;

    await this.loteService.create(loteEntity);

    return {
      lote: this.createLoteResponseDto(loteEntity),
      message: `lote '${loteEntity.nome}' criado com sucesso!`
    };
  }



  /**
   * Endpoint para retornar todos os lotes registrados na aplicação
   */
  @Get('/all')
  async getAll() {

    const lotes = await this.loteService.getAll();

    const loteList = lotes.map(
      lote => this.createLoteResponseDto(lote)
    );
    return loteList;
  }



  /**
   * Endpoint para buscar um lote tomando como parâmetro o código do lote
   *
   * @param codigo
   * @param nome
   */
  @Get('findById/:id')
  async findById(@Param('id', ParseIntPipe) codigo: number ) {
    return this.createLoteResponseDto(
      await this.loteService.findById(codigo)
    );
  }



  /**
   * Endpoint para buscar um lote tomando como parâmetro o nome do lote
   *
   * @param codigo
   * @param nome
   */
  @Get('findByName/:name')
  async findByName(@Param('name') nome: string ) {
    return this.createLoteResponseDto(
      await this.loteService.findByName(nome)
    );
  }



  /**
   * Endpoint para excluir um lote dos registros da aplicação
   *
   * @param codigo
   */
  @Delete(':codigo')
  async delete(@Param('codigo', ParseIntPipe) codigo: number) {

    const deletedLote = await this.loteService.delete(codigo);

    return {
      lote: this.createLoteResponseDto(deletedLote),
      message: `lote '${deletedLote.nome}' excluído com sucesso!`
    };
  }


  /**
   * Wrapper para criar um LoteResponseDto
   *
   * @param lote
   */
  private createLoteResponseDto(lote: LoteEntity){

    let codigoAnimalArray = [];

    if(lote && lote.animais){
      codigoAnimalArray = lote.animais.map(animal => animal.codigo)
    }
    return new LoteResponseDto(lote.codigo, lote.nome, codigoAnimalArray)
  }

}
