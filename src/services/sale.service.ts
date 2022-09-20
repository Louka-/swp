import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddSaleDto } from "src/dtos/add-sale.dto";
import { Sale } from "src/entities/sale.entity";
import { Repository } from "typeorm";

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) { }

  findAll(): Promise<Sale[]> {
    return this.saleRepository.find();
  }

  find(id: number): Promise<Sale> {
    return this.saleRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.saleRepository.delete(id);
  }

  async create(saleDto: AddSaleDto): Promise<Partial<Sale>> {
    const sale = this.saleRepository.create({ ...saleDto });
    await this.saleRepository.save(sale);
    return sale;
  }

  async edit(id: number, saleDto: AddSaleDto) {
    const sale = this.saleRepository.update(id, saleDto);
    return sale;
  }
}