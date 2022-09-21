import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserSubscribeDto } from 'src/dtos/user-subscribe.dto';
import { LoginCredentialsDto } from '../dtos/login-credentials.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get('all')
  getUsers() {
    return this.userService.findAll();
  }

  @Get('one/:id')
  getUser(
    @Param('id', ParseIntPipe) id
  ) {
    return this.userService.find(id);
  }

  @Post('register')
  register(
    @Body() userData: UserSubscribeDto
  ) {
    return this.userService.register(userData);
  }

  @Post('delete/:id')
  delete(
    @Param('id', ParseIntPipe) id
  ) {
    return this.userService.remove(id);
  }

  @Post('login')
  login(
    @Body() credentials: LoginCredentialsDto
  ) {
    return this.userService.login(credentials);
  }


  //TODO
  // //editPassword
  // @Post('edit-password')
  // editPassword() {

  // }

  // //editEmail
  // @Post('edit-Email')
  // editEmail() {

  // }
}
