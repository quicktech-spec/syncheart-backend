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
exports.CheckinsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const checkin_entity_1 = require("../entities/checkin.entity");
const relationship_entity_1 = require("../entities/relationship.entity");
let CheckinsService = class CheckinsService {
    constructor(checkinsRepository, relationshipsRepository) {
        this.checkinsRepository = checkinsRepository;
        this.relationshipsRepository = relationshipsRepository;
    }
    async createCheckin(userId, relationshipId, data) {
        const relationship = await this.relationshipsRepository.findOne({ where: { id: relationshipId } });
        if (!relationship)
            throw new common_1.NotFoundException('Relationship not found');
        const checkin = this.checkinsRepository.create({
            user: { id: userId },
            relationship: { id: relationshipId },
            mood_score: data.mood_score,
            stress_score: data.stress_score,
            energy_score: data.energy_score,
            need_type: data.need_type,
        });
        return this.checkinsRepository.save(checkin);
    }
    async getRecentCheckins(relationshipId) {
        return this.checkinsRepository.find({
            where: { relationship: { id: relationshipId } },
            order: { created_at: 'DESC' },
            take: 14,
            relations: ['user']
        });
    }
};
exports.CheckinsService = CheckinsService;
exports.CheckinsService = CheckinsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(checkin_entity_1.Checkin)),
    __param(1, (0, typeorm_1.InjectRepository)(relationship_entity_1.Relationship)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CheckinsService);
//# sourceMappingURL=checkins.service.js.map