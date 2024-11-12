import { Module } from '@nestjs/common';
import { VagasService } from './vagas.service';
import { VagasController } from './vagas.controller';

@Module({
  controllers: [VagasController],
  providers: [VagasService],
})
export class VagasModule {}
