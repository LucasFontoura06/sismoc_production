import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VagasService } from './vagas.service';
import { CreateVagasDto } from './dto/create-vagas.dto';
import { UpdateVagasDto } from './dto/update-vagas.dto';
import { CONSTANTES } from 'src/common/constantes';

@Controller(`${CONSTANTES.API_BASE_URL}/vagas`)
export class VagasController {
  constructor(private readonly vagasService: VagasService) { }

  @Post()
  create(@Body() createVagasDto: CreateVagasDto) {
    return this.vagasService.create(createVagasDto);
  }

  @Get()
  findAll() {
    return this.vagasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vagasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVagasDto: UpdateVagasDto) {
    return this.vagasService.update(id, updateVagasDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vagasService.remove(id);
  }
}
