import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleController } from 'src/controllers/sale.controller';
import { Sale } from 'src/entities/sale.entity';
import { UsersModule } from 'src/modules/users.module';
import { SaleService } from 'src/services/sale.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale]),
    UsersModule,
  ],
  providers: [SaleService],
  controllers: [SaleController],
})
export class SaleModule { }