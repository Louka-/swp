import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { AddProfilDto } from '../dtos/add-profil.dto';
import { ProfilService } from '../services/profil.service';

@Controller('profil')
export class ProfilController {
  constructor(private profilService: ProfilService) { }

  @Get('all')
  getProfils() {
    return this.profilService.findAll();
  }

  @Get('one/:id')
  getProfil(
    @Param('id', ParseIntPipe) id,
  ) {
    return this.profilService.find(id);
  }

  @Put('edit/:id')
  edit(
    @Param('id', ParseIntPipe) id,
    @Body() profilDto: AddProfilDto) {
    return this.profilService.editProfil(id, profilDto);
  }

  @Post('delete/:id')
  delete(
    @Param('id', ParseIntPipe) id,
  ) {
    return this.profilService.delete(id);
  }
}
