import {
  Body, Controller, Get, Param, Req,
  Res, ParseIntPipe, Post, UseGuards
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { User } from 'src/entities/user.entity';
import { RegistrationReqModel } from 'src/dtos/registration.req.model';


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
    @Body() userData: RegistrationReqModel,
  ) {
    return this.userService.registerUser(userData);
  }

  @Post('delete/:id')
  delete(
    @Param('id', ParseIntPipe) id
  ) {
    return this.userService.remove(id);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.userService.getJwtToken(req.user);
    const refreshToken = await this.userService.getRefreshToken(
      req.user.id,
    );
    const secretData = {
      token,
      refreshToken,
    };

    res.cookie('auth-cookie', secretData.token);
    console.log(res.get('auth-cookies'))
    res.send({
      success: true,
      user: req.user
    })
  }

  @Get('refresh-token')
  @UseGuards(AuthGuard('refresh'))
  async regenerateTokens(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.getJwtToken(req.user);
    const refreshToken = await this.userService.getRefreshToken(
      req.user.id,
    );
    const secretData = {
      token,
      refreshToken,
    };

    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return { msg: 'success' };
  }

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

