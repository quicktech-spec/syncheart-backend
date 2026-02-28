import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { Program } from '../entities/program.entity';
import { ProgramProgress } from '../entities/program-progress.entity';
import { Relationship } from '../entities/relationship.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Program, ProgramProgress, Relationship])],
    providers: [ProgramsService],
    controllers: [ProgramsController],
    exports: [ProgramsService],
})
export class ProgramsModule { }
