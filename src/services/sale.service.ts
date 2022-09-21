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

  async create(saleDto: AddSaleDto, user): Promise<Sale> {
    const sale = this.saleRepository.create(saleDto);
    sale.user = user.id
    await this.saleRepository.save(sale);
    return sale;
  }

  async edit(id: number, saleDto: Partial<Sale>) {
    const sale = this.saleRepository.update(id, saleDto);
    return sale;
  }

  getSalesByUser(user): Promise<Sale[]> {
    return this.saleRepository.find({ user: user.id });
  }
}