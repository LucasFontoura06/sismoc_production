import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SegmentosService } from './segmentos.service';
import { CreateSegmentoDto } from './dto/create-segmento.dto';
import { UpdateSegmentoDto } from './dto/update-segmento.dto';
import { CONSTANTES } from 'src/common/constantes';

@Controller(`${CONSTANTES.API_BASE_URL}/segmentos`)
export class SegmentosController {
  constructor(private readonly segmentosService: SegmentosService) {}

  @Post()
  create(@Body() createSegmentoDto: CreateSegmentoDto) {
    return this.segmentosService.create(createSegmentoDto);
  }

  @Get()
  findAll() {
    return this.segmentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.segmentosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSegmentoDto: UpdateSegmentoDto) {
    return this.segmentosService.update(id, updateSegmentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.segmentosService.remove(id);
  }
}
