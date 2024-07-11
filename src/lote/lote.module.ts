import { Module } from '@nestjs/common';
import { LoteController } from './lote.controller';
import { LoteRepository } from "./lote.repository";
import { UniqueValidator } from "./validation/unique.validator";
import { LoteService } from './lote.service';
import { LoteEntity } from "./lote.entity";

@Module({
  controllers: [LoteController],
  providers: [LoteRepository, UniqueValidator, LoteService],
  exports: [LoteRepository, LoteService]
})
export class LoteModule {}
