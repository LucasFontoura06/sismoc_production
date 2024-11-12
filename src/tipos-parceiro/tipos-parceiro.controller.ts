import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposParceiroService } from './tipos-parceiro.service';
import { CreateTiposParceiroDto } from './dto/create-tipos-parceiro.dto';
import { UpdateTiposParceiroDto } from './dto/update-tipos-parceiro.dto';
import { CONSTANTES } from 'src/common/constantes';

@Controller(`${CONSTANTES.API_BASE_URL}/tipos_parceiro`)
export class TiposParceiroController {
  constructor(private readonly tiposParceiroService: TiposParceiroService) {}

  @Post()
  create(@Body() createTiposParceiroDto: CreateTiposParceiroDto) {
    return this.tiposParceiroService.create(createTiposParceiroDto);
  }

  @Get()
  findAll() {
    return this.tiposParceiroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposParceiroService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposParceiroDto: UpdateTiposParceiroDto) {
    return this.tiposParceiroService.update(id, updateTiposParceiroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposParceiroService.remove(id);
  }
}
