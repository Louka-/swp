import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { ProfilService } from './profil.service';
import { DateTime } from "luxon";
import * as randomToken from 'rand-token';
import { RegistrationReqModel } from 'src/dtos/registration.req.model';
import { RegistrationRespModel } from 'src/dtos/registration.resp.model';

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

  findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email: email });
  }

  updateUser(user, profil) {
    return this.usersRepository.update(profil, user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  private async registrationValidation(
    regModel: RegistrationReqModel,
  ): Promise<string> {
    if (!regModel.email) {
      return "L'email ne peut être vide";
    }

    const emailRule =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRule.test(regModel.email.toLowerCase())) {
      return "L'email n'est pas valide";
    }

    const user = await this.usersRepository.findOne({ email: regModel.email });
    if (user != null && user.email) {
      return "Un compte possédant cet email éxiste déjà";
    }

    if (regModel.password !== regModel.confirmPassword) {
      return 'Le mot de passe de confirmation ne correspond pas';
    }
    return '';
  }

  private async getPasswordHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  public async registerUser(
    regModel: RegistrationReqModel,
  ): Promise<RegistrationRespModel> {
    let result = new RegistrationRespModel();

    const errorMessage = await this.registrationValidation(regModel);
    if (errorMessage) {
      result.message = errorMessage;
      result.successStatus = false;

      return result;
    }

    let newUser = new User();

    newUser.email = regModel.email;
    newUser.password = await this.getPasswordHash(regModel.password);

    const today = DateTime.now()
    const emptyModel = {
      name: '',
      race: 'Ghost',
      description: 'to be filled',
      picture: "",
      birthday: today,
      phone: '0606060606',
      city: 'NoWhere',
      level: null,
    };

    const emptyProfil = await this.profilService.create(emptyModel);

    newUser.profil = emptyProfil;
    newUser.createdAt = today

    await this.usersRepository.insert(newUser);
    result.successStatus = true;
    result.message = 'success';
    return result;
  }

  public async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    let user = await this.usersRepository.findOne({ email: email });

    if (user == null) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    let currentUser = new User();
    currentUser.id = user.id;
    currentUser.email = user.email;

    return currentUser;
  }

  public async getJwtToken(user: User): Promise<string> {
    const payload = {
      ...user,
    };
    return this.jwtService.signAsync(payload);
  }

  public async getRefreshToken(userId: number): Promise<string> {
    const userDataToUpdate = {
      refreshToken: randomToken.generate(16),
      refreshTokenExp: DateTime.now().set({ days: 14 }).toFormat('YYYY/MM/DD'),
    };

    await this.usersRepository.update(userId, userDataToUpdate);
    return userDataToUpdate.refreshToken;
  }

  public async validRefreshToken(
    email: string,
    refreshToken: string,
  ): Promise<User> {
    const currentDate = DateTime.now().set({ days: 14 }).toFormat('YYYY/MM/DD');
    let user = await this.usersRepository.findOne({
      where: {
        email: email,
        refreshToken: refreshToken,
        refreshTokenExp: MoreThanOrEqual(currentDate),
      },
    });

    if (!user) {
      return null;
    }

    let currentUser = new User();
    currentUser.id = user.id;
    currentUser.email = user.email;

    return currentUser;
  }
}
