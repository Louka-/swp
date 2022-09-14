import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilModule } from './profil/profil.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'db_swp',
    autoLoadEntities: true,
  }), UsersModule, ProfilModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
