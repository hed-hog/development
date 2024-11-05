import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonTypeDTO } from './create-person-type.dto';

export class UpdatePersonTypeDTO extends PartialType(CreatePersonTypeDTO) {}
