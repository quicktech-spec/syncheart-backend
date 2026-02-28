import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function runMigrations(dataSource: DataSource) {
    try {
        // Add invite_code column if it doesn't exist
        await dataSource.query(`
            ALTER TABLE users ADD COLUMN IF NOT EXISTS invite_code VARCHAR(16) UNIQUE
        `).catch(() => { }); // ignore if already exists (SQLite doesn't support IF NOT EXISTS)

        // Add display_name column if it doesn't exist
        await dataSource.query(`
            ALTER TABLE users ADD COLUMN IF NOT EXISTS display_name VARCHAR(255)
        `).catch(() => { });

        // Create messages table if it doesn't exist
        await dataSource.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                relationship_id UUID NOT NULL,
                sender_id UUID NOT NULL,
                ciphertext TEXT NOT NULL,
                iv VARCHAR(64) NOT NULL,
                auth_tag VARCHAR(64) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `).catch(() => { });

        console.log('✅ Migrations applied');
    } catch (e) {
        console.error('Migration warning (non-fatal):', e.message);
    }
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/v1');
    app.enableCors();

    // Run schema migrations after app starts
    const dataSource = app.get(DataSource);
    await runMigrations(dataSource);

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 SynchHeart V2 Enterprise API running on: http://localhost:${port}/api/v1`);
}
bootstrap();
