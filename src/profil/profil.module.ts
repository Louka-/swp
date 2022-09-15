import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profil } from './profil.entity';
import { ProfilService } from './profil.service';
import { ProfilController } from './profil.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profil]),
    UsersModule,
  ],
  providers: [ProfilService],
  controllers: [ProfilController],
})
export class ProfilModule { }