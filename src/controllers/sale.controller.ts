import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AddSaleDto } from 'src/dtos/add-sale.dto';
import { Sale } from 'src/entities/sale.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SaleService } from 'src/services/sale.service';

@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) { }

  sales: Sale[];
  @Get('all')
  getSales() {
    return this.saleService.findAll();
  }

  @Get('allByUser')
  @UseGuards(JwtAuthGuard)
  getSalesByUser(
    @User() user
  ) {
    return this.saleService.getSalesByUserProfil(user);
  }

  @Get('one/:id')
  getUser(@Param('id') id) {
    return this.saleService.find(id);
  }

  @Post('create')
  create(
    @Body() saleDto: AddSaleDto,
  ): Promise<Sale> {
    return this.saleService.create(saleDto);
  }

  @Put('edit/:id')
  edit(
    @Param('id', ParseIntPipe) id,
    @Body() saleDto: Partial<Sale>) {
    return this.saleService.edit(id, saleDto);
  }

  @Post('delete/:id')
  delete(
    @Param('id', ParseIntPipe) id,
  ) {
    return this.saleService.delete(id);
  }
}
