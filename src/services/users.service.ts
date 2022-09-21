import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { LoginCredentialsDto } from '../dtos/login-credentials.dto';
import { UserSubscribeDto } from 'src/dtos/user-subscribe.dto';
import { ProfilService } from './profil.service';
import { Profil } from 'src/entities/profil.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private profilService: ProfilService,
    private jwtService: JwtService,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  find(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  updateUser(user, profil) {
    return this.usersRepository.update(profil, user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async register(userData: UserSubscribeDto): Promise<Partial<User>> {

    const today = new Date(Date.now())

    const user = this.usersRepository.create(userData);
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);

    const emptyModel = {
      name: '',
      race: 'Gost',
      description: 'to be filled',
      picture: "",
      birthday: today,
      phone: 1234567890,
      level: null,
    };

    const emptyProfil = await this.profilService.create(emptyModel);

    user.profil = emptyProfil;
    user.createdAt = today

    await this.usersRepository.save(user);
    return {
      id: user.id,
      email: user.email,
      profil: user.profil,
      createdAt: user.createdAt,
      //TODO: add a role
    };
  }

  async login(credentials: LoginCredentialsDto) {

    const { email, password } = credentials;
    const user = await this.usersRepository.createQueryBuilder("user")
      .where("user.email = :email",
        { email }
      )
      .getOne();

    if (!user)
      throw new NotFoundException('email ou password erronée');
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword === user.password) {
      const payload = {
        email: user.email,
      };
      const jwt = await this.jwtService.sign(payload);
      return {
        "id": user.id,
        "email": user.email,
        "jwt": jwt,
      };
    } else {
      throw new NotFoundException('email ou password erronée');
    }
  }
}
