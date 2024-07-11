import { redisStore } from "cache-manager-redis-store";
import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: configService.get<string>('REDIS_HOST') || "localhost",
        port: parseInt(configService.get<string>('REDIS_PORT')! ) || 6379,
      },
      ttl: 60 //apenas o tempo suficiente para verificar por meio do RedInsight a entrada no cache
    });
    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};