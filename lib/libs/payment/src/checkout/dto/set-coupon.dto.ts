import { IsString } from 'class-validator';

export class SetCouponDTO {
  @IsString()
  code: string;

  @IsString()
  slug: string;
}
