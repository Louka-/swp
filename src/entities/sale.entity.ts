import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profil } from "./profil.entity";

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  message: string;

  @Column()
  createdAt: string;

  @Column()
  pictureOne: string;

  @Column()
  pictureTwo: string;

  @Column()
  pictureThree: string;

  @Column()
  price: number;

  @Column()
  shipping: boolean;

  @ManyToOne(() => Profil, profil => profil.sale)
  profil: Profil;

}