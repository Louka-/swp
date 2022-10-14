import { IsBoolean, isBoolean, IsDate, isNotEmpty, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { Profil } from "src/entities/profil.entity";

export class AddSaleDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'La taille minimale du titre est de 6 caractère'
  })
  @MaxLength(25)
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  message: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: string;

  @IsString()
  @IsNotEmpty()
  pictureOne: string;

  @IsString()
  @IsNotEmpty()
  pictureTwo: string;

  @IsString()
  @IsNotEmpty()
  pictureThree: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  shipping: boolean;

  @IsNotEmpty()
  profil: Profil;

}