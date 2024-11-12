import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListasOuvidoriasService } from './listasOuvidorias.service';
import { ListasOuvidoria } from './entities/listasOuvidoria.entity';
import { CONSTANTES } from 'src/common/constantes';

@Controller(`${CONSTANTES.API_BASE_URL}/listasOuvidoria`)
export class ListasOuvidoriaController {
  constructor(private readonly listasOuvidoriasService: ListasOuvidoriasService) {}

  @Post()
  create(@Body() listasOuvidoria: ListasOuvidoria) {
    console.log('Controller recebeu:', listasOuvidoria);
    return this.listasOuvidoriasService.create(listasOuvidoria);
  }

  @Get()
  findAll() {
    return this.listasOuvidoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listasOuvidoriasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() listasOuvidoria: ListasOuvidoria) {
    return this.listasOuvidoriasService.update(id, listasOuvidoria);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listasOuvidoriasService.remove(id);
  }
}
