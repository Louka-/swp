import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { UsersController } from '../controllers/users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/passport-jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { ProfilService } from 'src/services/profil.service';
import { Profil } from 'src/entities/profil.entity';

@Module({
  controllers: [UsersController],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Profil]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: 3600 },
    }),
  ],
  providers: [UsersService, ProfilService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule { }