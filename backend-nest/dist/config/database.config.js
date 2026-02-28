"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const user_entity_1 = require("../entities/user.entity");
const relationship_entity_1 = require("../entities/relationship.entity");
const checkin_entity_1 = require("../entities/checkin.entity");
const conflict_entity_1 = require("../entities/conflict.entity");
const ai_insight_entity_1 = require("../entities/ai-insight.entity");
const program_entity_1 = require("../entities/program.entity");
const program_progress_entity_1 = require("../entities/program-progress.entity");
const dotenv = require("dotenv");
dotenv.config();
exports.DatabaseConfig = {
    type: 'sqlite',
    database: 'syncheart.sqlite',
    entities: [user_entity_1.User, relationship_entity_1.Relationship, checkin_entity_1.Checkin, conflict_entity_1.Conflict, ai_insight_entity_1.AiInsight, program_entity_1.Program, program_progress_entity_1.ProgramProgress],
    synchronize: true,
};
//# sourceMappingURL=database.config.js.map