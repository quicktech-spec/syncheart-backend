import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { CheckinsModule } from './checkins/checkins.module';
import { ConflictsModule } from './conflicts/conflicts.module';
import { AiModule } from './ai/ai.module';
import { ProgramsModule } from './programs/programs.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(DatabaseConfig),
        AuthModule,
        CheckinsModule,
        ConflictsModule,
        AiModule,
        ProgramsModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
