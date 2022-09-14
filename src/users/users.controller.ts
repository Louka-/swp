import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserSubscribeDto } from './user-subscribe.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService
    ) { }

    @Get('all')
    getUsers() {
        return this.userService.findAll();
    }

    @Get('one')
    getUser() {
        console.log('un nouveau user');
        return 'nouveau user';
    }

    //register
    @Post('register')
    register(@Body() userData: UserSubscribeDto) {
        return this.userService.register(userData)
    }

    @Post('delete')
    delete(@Body() id: number) {
        return this.userService.remove(id)
    }

    //login
    // @Post('login')
    // login(@Body() credentials: LoginCredentialsDto) {
    //     return this.userService.login(credentials);
    // }

    // //editPassword
    // @Post('edit-password')
    // editPassword() {

    // }

    // //editEmail
    // @Post('edit-Email')
    // editEmail() {

    // }
}
