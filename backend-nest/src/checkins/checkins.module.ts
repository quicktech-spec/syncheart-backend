import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckinsService } from './checkins.service';
import { CheckinsController } from './checkins.controller';
import { Checkin } from '../entities/checkin.entity';
import { Relationship } from '../entities/relationship.entity';
import { User } from '../entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Checkin, Relationship, User])],
    providers: [CheckinsService],
    controllers: [CheckinsController],
    exports: [CheckinsService],
})
export class CheckinsModule { }
