import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposParceiroDto } from './create-tipos-parceiro.dto';

export class UpdateTiposParceiroDto extends PartialType(CreateTiposParceiroDto) {}
