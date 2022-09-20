import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profil } from '../entities/profil.entity';
import { ProfilService } from '../services/profil.service';
import { ProfilController } from '../controllers/profil.controller';
import { UsersModule } from 'src/modules/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profil]),
    UsersModule,
  ],
  providers: [ProfilService],
  controllers: [ProfilController],
})
export class ProfilModule { }