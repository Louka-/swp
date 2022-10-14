import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilModule } from './modules/profil.module';
import { UsersModule } from './modules/users.module';
import { SaleModule } from './modules/sale.module';
import * as dotenv from 'dotenv';
import { MulterModule } from '@nestjs/platform-express';
import { PhotosController } from './controllers/photos.controller';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: false,
      autoLoadEntities: true,
    }),
    UsersModule,
    ProfilModule,
    SaleModule,
    MulterModule.register({
      dest: './files',
    })
  ],
  controllers: [PhotosController],
  providers: [],
  exports: []
})
export class AppModule { }
