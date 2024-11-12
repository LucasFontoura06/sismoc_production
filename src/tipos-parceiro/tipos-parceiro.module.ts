import { Module } from '@nestjs/common';
import { TiposParceiroService } from './tipos-parceiro.service';
import { TiposParceiroController } from './tipos-parceiro.controller';

@Module({
  controllers: [TiposParceiroController],
  providers: [TiposParceiroService],
})
export class TiposParceiroModule {}
