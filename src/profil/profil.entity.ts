import { User } from '../users/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToOne((type) => User, (user) => user.profil)
  @JoinColumn()
  user: User;
}
