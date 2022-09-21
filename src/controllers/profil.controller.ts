import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AddProfilDto } from '../dtos/add-profil.dto';
import { ProfilService } from '../services/profil.service';

@Controller('profil')
export class ProfilController {
  constructor(private profilService: ProfilService) { }

  @Get('all')
  getUsers() {
    return this.profilService.findAll();
  }

  @Get('one/:id')
  getUser(
    @Param('id', ParseIntPipe) id,
  ) {
    return this.profilService.find(id);
  }

  @Post('create')
  create(@Body() profilDto: AddProfilDto) {
    return this.profilService.create(profilDto);
  }

  @Patch('edit/:id')
  edit(
    @Param('id', ParseIntPipe) id,
    @Body() profilDto: AddProfilDto) {
    return this.profilService.edit(id, profilDto);
  }

  @Post('delete/:id')
  delete(
    @Param('id', ParseIntPipe) id,
  ) {
    return this.profilService.delete(id);
  }
}
