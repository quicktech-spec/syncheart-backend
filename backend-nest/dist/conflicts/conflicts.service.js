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
exports.ConflictsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const conflict_entity_1 = require("../entities/conflict.entity");
const relationship_entity_1 = require("../entities/relationship.entity");
const crypto = require("crypto");
let ConflictsService = class ConflictsService {
    constructor(conflictsRepository, relationshipsRepository) {
        this.conflictsRepository = conflictsRepository;
        this.relationshipsRepository = relationshipsRepository;
        this.algorithm = 'aes-256-cbc';
        this.key = Buffer.from(process.env.APP_ENCRYPTION_KEY || '12345678901234567890123456789012', 'utf-8');
    }
    encrypt(text) {
        if (!text)
            return text;
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;
    }
    decrypt(text) {
        if (!text)
            return text;
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
    async logConflict(relationshipId, data) {
        const relationship = await this.relationshipsRepository.findOne({ where: { id: relationshipId } });
        if (!relationship)
            throw new common_1.NotFoundException('Relationship not found');
        const conflict = this.conflictsRepository.create({
            relationship: { id: relationshipId },
            trigger_category: data.trigger_category,
            intensity: data.intensity,
            resolution_status: 'unresolved',
            private_notes: this.encrypt(data.private_notes)
        });
        return this.conflictsRepository.save(conflict);
    }
    async resolveConflict(conflictId) {
        const conflict = await this.conflictsRepository.findOne({ where: { id: conflictId } });
        if (!conflict)
            throw new common_1.NotFoundException('Conflict not found');
        conflict.resolution_status = 'resolved';
        return this.conflictsRepository.save(conflict);
    }
    async getRecentConflicts(relationshipId) {
        const conflicts = await this.conflictsRepository.find({
            where: { relationship: { id: relationshipId } },
            order: { created_at: 'DESC' },
            take: 10,
        });
        return conflicts.map(conflict => {
            if (conflict.private_notes) {
                try {
                    conflict.private_notes = this.decrypt(conflict.private_notes);
                }
                catch (e) {
                    console.error('Failed to decrypt private notes', e);
                }
            }
            return conflict;
        });
    }
};
exports.ConflictsService = ConflictsService;
exports.ConflictsService = ConflictsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conflict_entity_1.Conflict)),
    __param(1, (0, typeorm_1.InjectRepository)(relationship_entity_1.Relationship)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ConflictsService);
//# sourceMappingURL=conflicts.service.js.map