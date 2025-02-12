import { IsInt, IsString } from 'class-validator';

export class AddSubscriptionCancelDTO {
  @IsInt()
  subscriptionId: number;

  @IsInt({ each: true })
  reasonIds: number[];

  @IsInt()
  personId: number;

  @IsString()
  comment: string;
}
