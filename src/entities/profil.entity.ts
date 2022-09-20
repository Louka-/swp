import { User } from './user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from './level.entity';

@Entity()
export class Profil {
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
  birthday: string;

  @Column()
  phone: number;

  @OneToOne((type) => Level)
  @JoinColumn()
  level: Level;

}
