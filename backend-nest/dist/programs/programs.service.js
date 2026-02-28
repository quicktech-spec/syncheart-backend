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
exports.ProgramsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const program_entity_1 = require("../entities/program.entity");
const program_progress_entity_1 = require("../entities/program-progress.entity");
let ProgramsService = class ProgramsService {
    constructor(programsRepository, programProgressRepository) {
        this.programsRepository = programsRepository;
        this.programProgressRepository = programProgressRepository;
    }
    async getAllPrograms() {
        return this.programsRepository.find();
    }
    async getActiveProgramsForRelationship(relationshipId) {
        return this.programProgressRepository.find({
            where: { relationship_id: relationshipId },
            relations: ['program']
        });
    }
    async enrollInProgram(relationshipId, programId) {
        const progress = this.programProgressRepository.create({
            program_id: programId,
            relationship_id: relationshipId,
            progress_percentage: 0,
            completed_tasks: 0
        });
        return this.programProgressRepository.save(progress);
    }
    async updateProgress(relationshipId, programId, completedTasks, totalTasks) {
        const progress = await this.programProgressRepository.findOne({
            where: { program_id: programId, relationship_id: relationshipId }
        });
        if (!progress)
            throw new common_1.NotFoundException('Program enrollment not found');
        progress.completed_tasks = completedTasks;
        progress.progress_percentage = (completedTasks / totalTasks) * 100;
        return this.programProgressRepository.save(progress);
    }
};
exports.ProgramsService = ProgramsService;
exports.ProgramsService = ProgramsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(program_entity_1.Program)),
    __param(1, (0, typeorm_1.InjectRepository)(program_progress_entity_1.ProgramProgress)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProgramsService);
//# sourceMappingURL=programs.service.js.map