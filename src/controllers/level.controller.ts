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

  @Patch('edit')
  updateLevel(@Body() level: Level, propertyPath: 'value', value: 1) {
    return this.levelService.updateLevel(level, propertyPath, value);
  }
}