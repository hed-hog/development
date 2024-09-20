import { IsInt, IsJWT, Max, Min } from "class-validator";

export class OtpDTO {

  @Min(0)
  @Max(999999)
  @IsInt()
  code: number;

  @IsJWT()
  token: string;

}