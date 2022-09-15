import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddProfilDto } from './dto/add-profil.dto';
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

  find(id: number): Promise<Profil> {
    return this.profilRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.profilRepository.delete(id);
  }

  async create(profilDto: AddProfilDto, user): Promise<Partial<Profil>> {
    const profil = this.profilRepository.create({ ...profilDto });
    profil.user = user;
    await this.profilRepository.save(profil);
    return profil;
  }

  async edit(profilDto: AddProfilDto): Promise<Partial<Profil>> {
    const profil = this.profilRepository.save(profilDto);
    return profil;
  }
}
