import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { LevelService } from "src/services/level.service";

@Controller('level')
export class LevelController {
  constructor(public levelService: LevelService) { }

  @Get('one/:id')
  getLevel(
    @Param('id', ParseIntPipe) id
  ) {
    return this.levelService.find(id);
  }

  @Post('create')
  create() {
    return this.levelService.create();
  }
}