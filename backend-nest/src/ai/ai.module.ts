import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiInsight } from '../entities/ai-insight.entity';
import { Relationship } from '../entities/relationship.entity';
import { CheckinsModule } from '../checkins/checkins.module';
import { ConflictsModule } from '../conflicts/conflicts.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AiInsight, Relationship]),
        CheckinsModule,
        ConflictsModule
    ],
    providers: [AiService],
    controllers: [AiController],
    exports: [AiService],
})
export class AiModule { }
