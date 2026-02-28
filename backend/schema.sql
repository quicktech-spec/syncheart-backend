-- Schema creation for SynchHeart V2 Architecture

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE USERS (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  attachment_style TEXT,
  love_language TEXT
);

CREATE TABLE RELATIONSHIPS (
  relationship_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_1_id UUID REFERENCES USERS(user_id),
  partner_2_id UUID REFERENCES USERS(user_id),
  start_date DATE,
  status VARCHAR(20) DEFAULT 'active' -- 'active' or 'inactive'
);

CREATE TABLE DAILY_CHECKINS (
  checkin_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES USERS(user_id),
  relationship_id UUID REFERENCES RELATIONSHIPS(relationship_id),
  mood_score INT CHECK (mood_score BETWEEN 1 AND 10),
  stress_level INT CHECK (stress_level BETWEEN 1 AND 10),
  energy_level INT CHECK (energy_level BETWEEN 1 AND 10),
  need_today TEXT,
  private_note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE SYNC_SCORES (
  date DATE,
  relationship_id UUID REFERENCES RELATIONSHIPS(relationship_id),
  sync_percentage FLOAT,
  drift_flag BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (date, relationship_id)
);

CREATE TABLE CONFLICT_LOG (
  conflict_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  relationship_id UUID REFERENCES RELATIONSHIPS(relationship_id),
  trigger_type TEXT,
  intensity INT CHECK (intensity BETWEEN 1 AND 10),
  resolution_status TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE GROWTH_PROGRESS (
  program_id UUID,
  relationship_id UUID REFERENCES RELATIONSHIPS(relationship_id),
  progress_percentage FLOAT,
  completed_tasks INT DEFAULT 0,
  PRIMARY KEY (program_id, relationship_id)
);
