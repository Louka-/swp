import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get('all')
  getUsers() {
    return this.userService.findAll();
  }

  @Get('one')
  getUser(@Body() id: number) {
    return this.userService.find(id);
  }

  @Post('register')
  register(@Body() userData: UserSubscribeDto) {
    return this.userService.register(userData);
  }

  @Post('delete')
  delete(@Body() id: number) {
    return this.userService.remove(id);
  }

  @Post('login')
  login(@Body() credentials: LoginCredentialsDto) {
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
