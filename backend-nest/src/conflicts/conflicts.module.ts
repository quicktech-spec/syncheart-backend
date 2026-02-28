import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConflictsService } from './conflicts.service';
import { ConflictsController } from './conflicts.controller';
import { Conflict } from '../entities/conflict.entity';
import { Relationship } from '../entities/relationship.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Conflict, Relationship])],
    providers: [ConflictsService],
    controllers: [ConflictsController],
    exports: [ConflictsService],
})
export class ConflictsModule { }
