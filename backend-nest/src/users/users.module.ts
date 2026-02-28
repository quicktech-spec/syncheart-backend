import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../entities/user.entity';
import { Relationship } from '../entities/relationship.entity';
import { Checkin } from '../entities/checkin.entity';
import { Conflict } from '../entities/conflict.entity';
import { AiInsight } from '../entities/ai-insight.entity';
import { ProgramProgress } from '../entities/program-progress.entity';
import { Message } from '../entities/message.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Relationship, Checkin, Conflict, AiInsight, ProgramProgress, Message])],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule { }
