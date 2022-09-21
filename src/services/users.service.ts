import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { LoginCredentialsDto } from '../dtos/login-credentials.dto';
import { UserSubscribeDto } from 'src/dtos/user-subscribe.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  find(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async register(userData: UserSubscribeDto): Promise<Partial<User>> {
    const user = this.usersRepository.create({
      ...userData,
    });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    await this.usersRepository.save(user);
    return {
      id: user.id,
      email: user.email,
      //TODO: add a role
    };
  }

  // TODO: Login
  async login(credentials: LoginCredentialsDto) {

    // Récupére le login et le mot de passe
    const { email, password } = credentials;
    // On peut se logger ou via le username ou le password
    // Vérifier est ce qu'il y a un user avec ce login ou ce mdp
    const user = await this.usersRepository.createQueryBuilder("user")
      .where("user.email = :email",
        { email }
      )
      .getOne();
    // console.log(user);
    // Si not user je déclenche une erreur

    if (!user)
      throw new NotFoundException('email ou password erronée');
    // Si oui je vérifie est ce que le mot est correct ou pas
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
      // Si mot de passe incorrect je déclenche une erreur
      throw new NotFoundException('email ou password erronée');
    }
  }
}
