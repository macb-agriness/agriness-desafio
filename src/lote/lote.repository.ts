import { Injectable } from "@nestjs/common";
import * as console from "console";
import { LoteEntity } from "./lote.entity";

@Injectable()
export class LoteRepository{

  //apenas para simular algum mecanismo de persistência
  lotes: Array<LoteEntity> = new Array<LoteEntity>();


  /**
   * Cria um lote
   *
   * @param lote
   */
  async create(lote: LoteEntity): Promise<void> {
    this.lotes.push(lote);
  }


  /**
   * Retorna todos os lotes cadastrados
   */
  async getAll(): Promise<LoteEntity[]> {
    return this.lotes;
  }


  /**
   * Retorna um lote considerando {@param codigo} como parâmetro de busca.
   *
   * @param codigo
   */
  async findById(codigo: number): Promise<LoteEntity> {
    return this.lotes.find(item => item.codigo === codigo);
  }


  /**
   * Retorna um lote considerando {@param nome} como parâmetro de busca.
   *
   * @param nome
   */
  async findByName(nome: string): Promise<LoteEntity> {
    return this.lotes.find(item => item.nome === nome);
  }


  /**
   * Exclui dos registros da aplicação o lote com o {@param nome} como parâmetro de busca
   *
   * @param codigo
   */
  async delete(codigo: number) {
    this.lotes = this.lotes.filter(
      storedLote => storedLote.codigo != codigo
    );
  }
}