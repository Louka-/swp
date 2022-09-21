import { User } from './user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from './level.entity';
import { Sale } from './sale.entity';
import { Timestamp } from 'src/generics/timestamp.entity';

@Entity()
export class Profil extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  race: string;

  @Column()
  description: string;

  @Column()
  picture: string;

  @Column()
  birthday: Date;

  @Column()
  phone: number;

  @OneToOne((type) => Level)
  @JoinColumn()
  level: Level;

}
