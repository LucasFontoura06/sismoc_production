import { Module } from '@nestjs/common';
import { ListasOuvidoriaController } from './listasOuvidoria.controller';
import { ListasOuvidoriasService } from './listasOuvidorias.service';

@Module({
  controllers: [ListasOuvidoriaController],
  providers: [ListasOuvidoriasService],
})
export class ListasOuvidoriaModule {}
