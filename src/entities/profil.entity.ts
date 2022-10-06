import { User } from './user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from './level.entity';
import { Timestamp } from 'src/generics/timestamp.entity';
import { Sale } from './sale.entity';

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
  phone: string;

  @Column()
  city: string;

  @OneToOne(() => User, user => user.profil,
    {
      onDelete: 'CASCADE',
      cascade: true
    })
  user: User;

  @OneToMany(() => Sale, sale => sale.profil,
    {
      eager: true,
    })
  sales: Sale[];

  @OneToOne(() => Level)
  @JoinColumn()
  level: Level;

}
