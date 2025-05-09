import { IsString, IsOptional } from 'class-validator';

export class UploadFileDTO {
  @IsString()
  @IsOptional()
  destination?: string;
}
