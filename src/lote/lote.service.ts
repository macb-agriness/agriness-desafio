import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { LoteRepository } from "./lote.repository";
import { LoteEntity } from "./lote.entity";
import { AnimalEntity } from "../animal/animal.entity";

@Injectable()
export class LoteService {

  constructor(private loteRepository: LoteRepository) {}

  /**
   Serviço para registrar um lote na aplicação
   *
   * @param loteRequestDto
   */
  async create(loteEntity: LoteEntity) {
    await this.loteRepository.create(loteEntity);
  }

  /**
   Serviço que adiciona um animal ao lote registrado na aplicação
   */
  async addAnimal(animal: AnimalEntity) {

    const lote = await this.loteRepository.findById(animal.codigoLote);

    if (!lote) {
      throw new NotFoundException(`lote com código ${animal.codigoLote} não encontrado`);
    }
    lote.addAnimal(animal);
  }

  /**
   Serviço que exclui um animal ao lote registrado na aplicação
   */
  async deleteAnimal(codigoAnimal: number) {

    const loteAnimal = await this.findLoteAnimal(codigoAnimal);

    if (!loteAnimal) {
      throw new NotFoundException(`animal de código ${codigoAnimal} não encontrado`);
    }
    loteAnimal.deleteAnimal(codigoAnimal);
  }

  /**
   *
   */
  async findLoteAnimal(codigoAnimal: number){
    return this.loteRepository.lotes.find(
      lote => lote.findAnimalById(codigoAnimal)
    )
  }


  /**
   Serviço que retorna todos os lotes registrados na aplicação
   */
  async getAll() {
    return await this.loteRepository.getAll();
  }

  /**
   * Serviço para buscar um lote tomando como parâmetro o código do lote. Caso
   * o lote não seja encontrado é lançada uma exceção NotFoundException
   *
   * @param codigo
   */
  async findById(codigo: number) {

    const lote= await this.loteRepository.findById(codigo);

    if (!lote) {
      throw new NotFoundException(`Lote com código ${codigo} não encontrado`);
    }
    return lote;
  }

  /**
   * Serviço para buscar um lote tomando como parâmetro o nome do lote. Caso
   * o lote não seja encontrado é lançada uma exceção NotFoundException
   *
   * @param nome
   */
  async findByName(nome: string) {

    const lote = await this.loteRepository.findByName(nome);

    if (!lote) {
      throw new NotFoundException(`Lote com nome ${nome} não encontrado`);
    }
    return lote;
  }

  /**
   * Serviço que verifica se um Lote está registrado ou não na aplicação
   */
  async exists(key: any){

    if (typeof key === 'number') {
      return !!await this.loteRepository.findById(key)
    } else if (typeof key === 'string') {
      return !!await this.loteRepository.findByName(key)
    }
    return false;
  }

  /**
   * Serviço para excluir um lote dos registros da aplicação. Caso o lote
   * não seja encontrado é lançada uma exceção NotFoundException
   *
   * @param codigo
   */
  async delete(codigo: number) {

    const lote= await this.loteRepository.findById(codigo);

    if (!lote) {
      throw new NotFoundException(
        `não foi possível excluir o lote de código '${codigo}' (lote não encontrado)`);
    }
    if(!!lote.animais && lote.animais.length > 0){
      throw new BadRequestException (`não é possível excluir lotes com animais vinculados. Remova os animais antes.`)
    }
    await this.loteRepository.delete(codigo);

    return lote;
  }

}
