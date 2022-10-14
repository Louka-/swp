import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { UsersController } from '../controllers/users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ProfilService } from 'src/services/profil.service';
import { Profil } from 'src/entities/profil.entity';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { RefreshStrategy } from 'src/strategy/refresh.strategy';

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
  providers: [UsersService, ProfilService, LocalStrategy, JwtStrategy, RefreshStrategy],
  exports: [UsersService],
})
export class UsersModule { }