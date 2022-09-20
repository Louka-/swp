import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Level } from "src/entities/level.entity";
import { Repository, UpdateResult } from "typeorm";

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
  ) { }

  find(id: number): Promise<Level> {
    return this.levelRepository.findOne(id);
  }

  create(): Promise<Level> {
    const level = this.levelRepository.create({
      value: 0
    });
    return this.levelRepository.save(level);
  }

  updateLevel(level: Level, propertyPath: 'value', value: 1): Promise<UpdateResult> {
    return this.levelRepository.increment(level, propertyPath, value);
  }
}
