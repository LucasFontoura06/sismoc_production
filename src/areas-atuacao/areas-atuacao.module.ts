import { Module } from '@nestjs/common';
import { AreasAtuacaoService } from './areas-atuacao.service';
import { AreasAtuacaoController } from './areas-atuacao.controller';

@Module({
  controllers: [AreasAtuacaoController],
  providers: [AreasAtuacaoService],
})
export class AreasAtuacaoModule {}
