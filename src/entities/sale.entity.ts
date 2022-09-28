import { Timestamp } from "src/generics/timestamp.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profil } from "./profil.entity";

@Entity()
export class Sale extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  message: string;

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

  @ManyToOne(() => Profil, profil => profil.sales,
    {
      onDelete: 'CASCADE',
      cascade: true
    })
  profil: Profil;

}