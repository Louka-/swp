import { User } from './user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from './level.entity';
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

  @OneToOne(() => User, user => user.profil,
    {
      onDelete: 'CASCADE'
    })
  user: User;

  @OneToOne(() => Level)
  @JoinColumn()
  level: Level;

}
