import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { Level } from "src/entities/level.entity";
import { LevelService } from "src/services/level.service";

@Controller('level')
export class LevelController {
  constructor(public levelService: LevelService) { }

  @Get('one')
  getLevel(@Body() id: number) {
    return this.levelService.find(id);
  }

  @Post('create')
  create() {
    return this.levelService.create();
  }

  // @Patch('update')
  // updateLevel(@Body() id: number) {
  //   return this.levelService.updateLevel(id);
  // }
}