import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/modules/users.module';
import { Level } from 'src/entities/level.entity';
import { LevelService } from 'src/services/level.service';
import { LevelController } from 'src/controllers/level.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Level]),
    UsersModule,
  ],
  providers: [LevelService],
  controllers: [LevelController],
})
export class LevelModule { }