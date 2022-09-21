import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddProfilDto } from '../dtos/add-profil.dto';
import { Profil } from '../entities/profil.entity';

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

  async delete(id: number): Promise<void> {
    await this.profilRepository.delete(id);
  }

  async create(profilDto: AddProfilDto): Promise<Profil> {
    const profil = this.profilRepository.create(profilDto);
    await this.profilRepository.save(profil);
    return profil;
  }

  async editProfil(id: number, profilDto: AddProfilDto) {
    const profil = this.profilRepository.update(id, profilDto);
    return await profil;
  }

  // public setEmptyProfilInUser(user: User): User {
  //   const dateNow = new Date(Date.now()).toLocaleString();

  //   const emptyModel = {
  //     name: '',
  //     race: 'Gost',
  //     description: 'to be filled',
  //     picture: "",
  //     birthday: dateNow,
  //     phone: null,
  //     level: null,
  //   };

  //   const emptyProfil = this.profilRepository.create({
  //     ...emptyModel,
  //     user: user
  //   });

  //   user.profil = emptyProfil;
  //   return user;
  // }
}
