import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AreasAtuacaoService } from './areas-atuacao.service';
import { CreateAreasAtuacaoDto } from './dto/create-areas-atuacao.dto';
import { UpdateAreasAtuacaoDto } from './dto/update-areas-atuacao.dto';
import { CONSTANTES } from 'src/common/constantes';

@Controller(`${CONSTANTES.API_BASE_URL}/areas_atuacao`)
export class AreasAtuacaoController {
  constructor(private readonly areasAtuacaoService: AreasAtuacaoService) {}

  @Post()
  create(@Body() createAreasAtuacaoDto: CreateAreasAtuacaoDto) {
    return this.areasAtuacaoService.create(createAreasAtuacaoDto);
  }

  @Get()
  findAll() {
    return this.areasAtuacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areasAtuacaoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreasAtuacaoDto: UpdateAreasAtuacaoDto) {
    return this.areasAtuacaoService.update(id, updateAreasAtuacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areasAtuacaoService.remove(id);
  }
}
