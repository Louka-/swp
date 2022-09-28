import { Profil } from './profil.entity';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Timestamp } from 'src/generics/timestamp.entity';
import { Sale } from './sale.entity';

@Entity()
export class User extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @OneToOne(() => Profil, profil => profil.user,
    {
      eager: true,
    })
  @JoinColumn()
  profil: Profil;
}
