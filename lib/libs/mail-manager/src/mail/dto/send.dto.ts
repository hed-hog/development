import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class SendTemplatedMailDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsObject()
  variables: Record<string, string>;
}
