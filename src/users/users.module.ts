import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [UsersController],
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.register({
            secret: process.env.SECRET,
            signOptions: {
                expiresIn: 3600
            }
        })
    ],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule { }