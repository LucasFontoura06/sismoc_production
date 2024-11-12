import { PartialType } from '@nestjs/mapped-types';
import { CreateAreasAtuacaoDto } from './create-areas-atuacao.dto';

export class UpdateAreasAtuacaoDto extends PartialType(CreateAreasAtuacaoDto) {}
