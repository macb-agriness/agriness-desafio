import { Module } from "@nestjs/common";
import { AnimalController } from "./animal.controller";
import { AnimalRepository } from "./animal.repository";
import { LoteModule } from "../lote/lote.module";

@Module({
  imports: [LoteModule],
  controllers: [AnimalController],
  providers: [AnimalRepository]
})
export class AnimalModule {}
