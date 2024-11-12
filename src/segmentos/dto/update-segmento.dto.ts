import { PartialType } from '@nestjs/mapped-types';
import { CreateSegmentoDto } from './create-segmento.dto';

export class UpdateSegmentoDto extends PartialType(CreateSegmentoDto) {}
