import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AddSaleDto } from 'src/dtos/add-sale.dto';
import { SaleService } from 'src/services/sale.service';

@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) { }

  @Get('all')
  getUsers() {
    return this.saleService.findAll();
  }

  @Get('one')
  getUser(@Body() id: number) {
    return this.saleService.find(id);
  }

  @Post('create')
  create(@Body() saleDto: AddSaleDto) {
    return this.saleService.create(saleDto);
  }

  @Patch('edit')
  edit(@Body() saleDto: AddSaleDto) {
    return this.saleService.edit(saleDto);
  }

  @Post('delete')
  delete(@Body() id: number) {
    return this.saleService.delete(id);
  }
}
