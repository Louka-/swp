import { IsNumber } from "class-validator";

export class UpdateLevelDto {

  @IsNumber()
  value: number;

}