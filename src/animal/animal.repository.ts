import { Injectable } from "@nestjs/common";
import console from "console";
import { AnimalEntity } from "./animal.entity";

@Injectable()
export class AnimalRepository {

  animais: Array<AnimalEntity> = new Array<AnimalEntity>();

  /**
   * Cria um lote
   *
   * @param lote
   */
  async create(animalEntity: AnimalEntity): Promise<void> {
    console.log(`Registrando o animal ${animalEntity.codigo} na aplicação`);
    this.animais.push(animalEntity);
  }

  /**
   * Retorna todos os animais cadastrados
   */
  async getAll(): Promise<AnimalEntity[]> {
    console.log(`Retornando todos os animais cadastrados na aplicação`);
    return this.animais;
  }

  /**
   * Retorna um animal considerando {@param codigo} como parâmetro de busca.
   *
   * @param codigo
   */
  async findByCodigo(codigo: number): Promise<AnimalEntity> {
    console.log(`Buscando o animal pelo código '${codigo}'`);
    return this.animais.find(item => item.codigo === codigo);
  }

  /**
   * Retorna um animal considerando {@param nome} como parâmetro de busca
   *
   * @param nome
   */
  async findByNome(nome: string): Promise<AnimalEntity> {
    console.log(`Buscando o animal pelo nome '${nome}'`);
    return this.animais.find(item => item.nome === nome);
  }


  /**
   * Exclui dos registros da aplicação o animal com o {@param nome} como parâmetro de busca
   *
   * @param codigo
   */
  async delete(codigo: number) {
    console.log(`Excluindo o animal de código '${codigo}'`);
    this.animais = this.animais.filter(
      storedAnimal => storedAnimal.codigo != codigo
    );
  }
}
