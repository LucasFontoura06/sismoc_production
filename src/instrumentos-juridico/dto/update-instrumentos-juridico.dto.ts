import { PartialType } from '@nestjs/mapped-types';
import { CreateInstrumentosJuridicoDto } from './create-instrumentos-juridico.dto';

export class UpdateInstrumentosJuridicoDto extends PartialType(CreateInstrumentosJuridicoDto) {}
