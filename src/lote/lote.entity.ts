import { AnimalEntity } from "../animal/animal.entity";
import { BadRequestException } from "@nestjs/common";

export class LoteEntity {

  //propriedade apenas como exemplo para fins de diferenciação do DTO
  uuid: string;
  codigo: number;
  nome: string;
  animais: Array<AnimalEntity>;



  /**
   * Verifica se {@param animal} está vinculado a este lote
   */
  public hasAnimal(animal: AnimalEntity) {

    if(!this.animais){
      return false;
    }
    return !!this.animais.find(storedAnimal => {
      return storedAnimal.codigo === animal.codigoLote
        || storedAnimal.nome === animal.nome;
    })
  }



  /**
   * Adiciona um animal a este lote
   */
  public addAnimal(animal: AnimalEntity) {

    if(this.hasAnimal(animal)){
      throw new BadRequestException (`o animal '${animal}' já está cadastrado no lote '${this.codigo}'`);
    }
    if(!this.animais){
      this.animais = new Array<AnimalEntity>();
    }
    this.animais.push(animal);
  }



  /**
   * Exclui um animal vinculado a este lote
   */
  public deleteAnimal(codigoAnimal: number) {
    if(!!this.animais){
      this.animais = this.animais.filter(
        storedAnimal => storedAnimal.codigo != codigoAnimal
      );
    }
  }



  /**
   *
   */
  public findAnimalById(codigo: number){
    return this.animais.find(storedAnimal => storedAnimal.codigo === codigo);
  }
}