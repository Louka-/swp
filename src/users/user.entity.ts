import { Profil } from '../profil/profil.entity';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @OneToOne((type) => Profil, (profil) => profil.user)
  @JoinColumn()
  profil: Profil;
}
