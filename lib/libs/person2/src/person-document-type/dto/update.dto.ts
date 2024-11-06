import { PartialType } from '@nestjs/mapped-types';
import { CreateDTO } from './create.dto';

export class UpdateDTO extends PartialType(CreateDTO) {}
