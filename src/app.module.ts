import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { ContatosModule } from './contatos/contatos.module';
import { InstrumentosJuridicoModule } from './instrumentos-juridico/instrumentos-juridico.module';
import { TiposParceiroModule } from './tipos-parceiro/tipos-parceiro.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VagasModule } from './vagas/vagas.module';
import { ParceirosModule } from './parceiros/parceiros.module';
import { SegmentosModule } from './segmentos/segmentos.module';
import { AreasAtuacaoModule } from './areas-atuacao/areas-atuacao.module';
import { ListasOuvidoriaModule } from './listasOuvidorias/listasOuvidoria.module';
import { CargosModule } from './cargos/cargos.module';

@Module({
  imports: [
    UsuariosModule,
    CargosModule,
    ParceirosModule,
    DashboardModule,
    EnderecosModule,
    VagasModule,
    SegmentosModule,
    TiposParceiroModule,
    InstrumentosJuridicoModule,
    ContatosModule,
    ListasOuvidoriaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AreasAtuacaoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
