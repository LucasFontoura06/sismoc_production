import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CONSTANTES } from 'src/common/constantes';

@Controller(`${CONSTANTES.API_BASE_URL}/usuarios`)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  create(@Body() usuario: Usuario) {
    return this.usuariosService.create(usuario);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() usuario: Usuario) {
  //   return this.usuariosService.update(id, usuario);
  // }

  @Put(':id')  // Mudando de Patch para Put
  async update(@Param('id') id: string, @Body() usuario: Usuario) {
    console.log('Recebendo requisição de atualização:', { id, usuario }); // Debug
    return this.usuariosService.update(id, usuario);
  }

  @Put(':id/status') // Novo endpoint para atualizar o status
  updateStatus(@Param('id') id: string, @Body('status') status: boolean) {
    return this.usuariosService.updateStatus(id, status);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usuariosService.remove(id);
  // }
}
