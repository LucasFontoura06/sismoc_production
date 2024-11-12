import { Module } from '@nestjs/common';
import { SegmentosService } from './segmentos.service';
import { SegmentosController } from './segmentos.controller';

@Module({
  controllers: [SegmentosController],
  providers: [SegmentosService],
})
export class SegmentosModule {}
