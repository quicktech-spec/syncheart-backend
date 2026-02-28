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
exports.ProgramsController = void 0;
const common_1 = require("@nestjs/common");
const programs_service_1 = require("./programs.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ProgramsController = class ProgramsController {
    constructor(programsService) {
        this.programsService = programsService;
    }
    async getAllPrograms() {
        return this.programsService.getAllPrograms();
    }
    async getActivePrograms(relationshipId) {
        return this.programsService.getActiveProgramsForRelationship(relationshipId);
    }
    async enrollInProgram(relationshipId, programId) {
        return this.programsService.enrollInProgram(relationshipId, programId);
    }
    async updateProgress(relationshipId, programId, body) {
        return this.programsService.updateProgress(relationshipId, programId, body.completed_tasks, body.total_tasks);
    }
};
exports.ProgramsController = ProgramsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "getAllPrograms", null);
__decorate([
    (0, common_1.Get)(':relationshipId/active'),
    __param(0, (0, common_1.Param)('relationshipId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "getActivePrograms", null);
__decorate([
    (0, common_1.Post)(':relationshipId/enroll/:programId'),
    __param(0, (0, common_1.Param)('relationshipId')),
    __param(1, (0, common_1.Param)('programId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "enrollInProgram", null);
__decorate([
    (0, common_1.Patch)(':relationshipId/progress/:programId'),
    __param(0, (0, common_1.Param)('relationshipId')),
    __param(1, (0, common_1.Param)('programId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "updateProgress", null);
exports.ProgramsController = ProgramsController = __decorate([
    (0, common_1.Controller)('programs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [programs_service_1.ProgramsService])
], ProgramsController);
//# sourceMappingURL=programs.controller.js.map