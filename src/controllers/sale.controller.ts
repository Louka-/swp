import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AddSaleDto } from 'src/dtos/add-sale.dto';
import { Sale } from 'src/entities/sale.entity';
import { SaleService } from 'src/services/sale.service';

@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) { }

  sales: Sale[];
  @Get('all')
  getSales() {
    return this.saleService.findAll();
  }

  @Get('allByUser/:id')
  getSalesByUser(
    @Param('id') id
  ) {
    return this.saleService.getSalesByUserProfil(id);
  }

  @Get('one/:id')
  getUser(@Param('id') id) {
    return this.saleService.find(id);
  }

  @Post('create/:id')
  create(
    @Body() saleDto: AddSaleDto,
    @Param('id', ParseIntPipe) id,
  ): Promise<Sale> {
    return this.saleService.create(saleDto, id);
  }

  @Put('edit/:id')
  edit(
    @Param('id', ParseIntPipe) id,
    @Body() saleDto: Partial<Sale>) {
    return this.saleService.edit(id, saleDto);
  }

  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) id,
  ) {
    return this.saleService.delete(id);
  }
}
