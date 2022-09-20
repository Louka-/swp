import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Profil } from "./profil.entity";

@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;
}