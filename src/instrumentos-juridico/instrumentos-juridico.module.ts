import { Module } from '@nestjs/common';
import { InstrumentosJuridicoService } from './instrumentos-juridico.service';
import { InstrumentosJuridicoController } from './instrumentos-juridico.controller';

@Module({
  controllers: [InstrumentosJuridicoController],
  providers: [InstrumentosJuridicoService],
})
export class InstrumentosJuridicoModule {}
