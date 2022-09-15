import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profil } from './profil.entity';

@Injectable()
export class ProfilService {
  constructor(
    @InjectRepository(Profil)
    private profilRepository: Repository<Profil>,
  ) { }

  findAll(): Promise<Profil[]> {
    return this.profilRepository.find();
  }

  findOne(id: number): Promise<Profil> {
    return this.profilRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.profilRepository.delete(id);
  }
}
