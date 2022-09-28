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

  async findAll(): Promise<Sale[]> {
    return await this.saleRepository.find();
  }

  async find(id: number): Promise<Sale> {
    return await this.saleRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.saleRepository.delete(id);
  }

  async create(saleDto: AddSaleDto): Promise<Sale> {
    const sale = this.saleRepository.create(saleDto);
    await this.saleRepository.save(sale);
    return sale;
  }

  edit(id: number, saleDto: Partial<Sale>) {
    const sale = this.saleRepository.update(id, saleDto);
    return sale;
  }

  async getSalesByUserProfil(user): Promise<Sale[]> {
    return await this.saleRepository.find({ profil: user.profil });
  }
}