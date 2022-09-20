import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateLevelDto } from "src/dtos/update-level.dto";
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

  // async updateLevel(id: number): Promise<Level> {
  //   const qb = this.levelRepository.createQueryBuilder("level");
  //   const updatedLevel = qb.select("level.value, id").setParameter({ 'value', + 1});
  //   await return this.levelRepository.save(updatedLevel);
  // }
}