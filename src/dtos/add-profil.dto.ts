import { IsDate, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class AddProfilDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'La taille minimale du champ name est de 6 caractère'
  })
  @MaxLength(25)
  name: string;

  @IsString()
  @IsNotEmpty()
  race: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsString()
  @IsNotEmpty()
  picture: string;

  @IsDate()
  @IsNotEmpty()
  birthday: Date;

  @IsNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  city: string;

}