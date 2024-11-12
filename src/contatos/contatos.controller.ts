import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContatosService } from './contatos.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';
import { CONSTANTES } from 'src/common/constantes';

@Controller(`${CONSTANTES.API_BASE_URL}/contatos`)
export class ContatosController {
  constructor(private readonly contatosService: ContatosService) {}

  @Post()
  create(@Body() createContatoDto: CreateContatoDto) {
    return this.contatosService.create(createContatoDto);
  }

  @Get()
  findAll() {
    return this.contatosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contatosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContatoDto: UpdateContatoDto) {
    return this.contatosService.update(id, updateContatoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contatosService.remove(id);
  }
}
