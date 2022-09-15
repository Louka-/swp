import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profil } from './profil.entity';
import { ProfilService } from './profil.service';
import { ProfilController } from './profil.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Profil])],
  providers: [ProfilService],
  controllers: [ProfilController],
})
export class ProfilModule { }