import { Module } from "@nestjs/common";
import { AnimalModule } from "./animal/animal.module";
import { LoteModule } from "./lote/lote.module";
import { CacheModule } from "@nestjs/cache-manager";
import { RedisOptions } from "./config/cache-config.constants";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    AnimalModule,
    LoteModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
  ]
})
export class AppModule {}
