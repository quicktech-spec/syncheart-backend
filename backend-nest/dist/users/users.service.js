"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const relationship_entity_1 = require("../entities/relationship.entity");
const checkin_entity_1 = require("../entities/checkin.entity");
const conflict_entity_1 = require("../entities/conflict.entity");
const ai_insight_entity_1 = require("../entities/ai-insight.entity");
const program_progress_entity_1 = require("../entities/program-progress.entity");
let UsersService = class UsersService {
    constructor(usersRepo, relationshipsRepo, checkinsRepo, conflictsRepo, aiInsightsRepo, programProgressRepo) {
        this.usersRepo = usersRepo;
        this.relationshipsRepo = relationshipsRepo;
        this.checkinsRepo = checkinsRepo;
        this.conflictsRepo = conflictsRepo;
        this.aiInsightsRepo = aiInsightsRepo;
        this.programProgressRepo = programProgressRepo;
    }
    async deleteUserAccount(userId) {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const relationships = await this.relationshipsRepo.find({
            where: [
                { partner_1: { id: userId } },
                { partner_2: { id: userId } }
            ]
        });
        for (const rel of relationships) {
            await this.checkinsRepo.delete({ relationship: { id: rel.id } });
            await this.programProgressRepo.delete({ relationship_id: rel.id });
            await this.conflictsRepo.delete({ relationship: { id: rel.id } });
            await this.aiInsightsRepo.delete({ relationship: { id: rel.id } });
            await this.relationshipsRepo.delete(rel.id);
        }
        await this.usersRepo.delete(userId);
        return { message: 'User account and all associated relationship data permanently deleted in accordance with GDPR.' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(relationship_entity_1.Relationship)),
    __param(2, (0, typeorm_1.InjectRepository)(checkin_entity_1.Checkin)),
    __param(3, (0, typeorm_1.InjectRepository)(conflict_entity_1.Conflict)),
    __param(4, (0, typeorm_1.InjectRepository)(ai_insight_entity_1.AiInsight)),
    __param(5, (0, typeorm_1.InjectRepository)(program_progress_entity_1.ProgramProgress)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map