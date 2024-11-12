import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstrumentosJuridicoService } from './instrumentos-juridico.service';
import { CreateInstrumentosJuridicoDto } from './dto/create-instrumentos-juridico.dto';
import { UpdateInstrumentosJuridicoDto } from './dto/update-instrumentos-juridico.dto';
import { CONSTANTES } from 'src/common/constantes';

@Controller(`${CONSTANTES.API_BASE_URL}/instrumentos_juridicos`)
export class InstrumentosJuridicoController {
  constructor(private readonly instrumentosJuridicoService: InstrumentosJuridicoService) {}

  @Post()
  create(@Body() createInstrumentosJuridicoDto: CreateInstrumentosJuridicoDto) {
    return this.instrumentosJuridicoService.create(createInstrumentosJuridicoDto);
  }

  @Get()
  findAll() {
    return this.instrumentosJuridicoService.findAll();
  }

  @Get('tipos')
  findAllTypes() {
    return this.instrumentosJuridicoService.findAllTypes();
  }

  @Get('status')
  findAllStatus() {
    return this.instrumentosJuridicoService.findAllStatus();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instrumentosJuridicoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstrumentosJuridicoDto: UpdateInstrumentosJuridicoDto) {
    return this.instrumentosJuridicoService.update(id, updateInstrumentosJuridicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instrumentosJuridicoService.remove(id);
  }
}
