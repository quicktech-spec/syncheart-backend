import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Relationship } from '../entities/relationship.entity';
import { Checkin } from '../entities/checkin.entity';
import { Conflict } from '../entities/conflict.entity';
import { AiInsight } from '../entities/ai-insight.entity';
import { Program } from '../entities/program.entity';
import { ProgramProgress } from '../entities/program-progress.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const isProd = !!process.env.DATABASE_URL;

export const DatabaseConfig: TypeOrmModuleOptions = {
    type: isProd ? 'postgres' : 'sqlite',
    ...(isProd
        ? { url: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
        : { database: 'syncheart.sqlite' }
    ),
    entities: [User, Relationship, Checkin, Conflict, AiInsight, Program, ProgramProgress],
    synchronize: true, // true in MVP to auto-build tables
} as TypeOrmModuleOptions;
