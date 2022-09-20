import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AddProfilDto } from '../dtos/add-profil.dto';
import { ProfilService } from '../services/profil.service';

@Controller('profil')
export class ProfilController {
  constructor(private profilService: ProfilService) { }

  @Get('all')
  getUsers() {
    return this.profilService.findAll();
  }

  @Get('one')
  getUser(@Body() id: number) {
    return this.profilService.find(id);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  create(@Body() profilDto: AddProfilDto, @User() user) {
    return this.profilService.create(profilDto, user);
  }

  @Patch('edit')
  edit(@Body() profilDto: AddProfilDto) {
    return this.profilService.edit(profilDto);
  }

  @Post('delete')
  delete(@Body() id: number) {
    return this.profilService.remove(id);
  }
}
