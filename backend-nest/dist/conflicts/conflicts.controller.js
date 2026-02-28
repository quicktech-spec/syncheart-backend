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
exports.ConflictsController = void 0;
const common_1 = require("@nestjs/common");
const conflicts_service_1 = require("./conflicts.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ConflictsController = class ConflictsController {
    constructor(conflictsService) {
        this.conflictsService = conflictsService;
    }
    async logConflict(relationshipId, conflictData) {
        return this.conflictsService.logConflict(relationshipId, conflictData);
    }
    async resolveConflict(conflictId) {
        return this.conflictsService.resolveConflict(conflictId);
    }
    async getRecentConflicts(relationshipId) {
        return this.conflictsService.getRecentConflicts(relationshipId);
    }
};
exports.ConflictsController = ConflictsController;
__decorate([
    (0, common_1.Post)(':relationshipId'),
    __param(0, (0, common_1.Param)('relationshipId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ConflictsController.prototype, "logConflict", null);
__decorate([
    (0, common_1.Patch)(':conflictId/resolve'),
    __param(0, (0, common_1.Param)('conflictId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConflictsController.prototype, "resolveConflict", null);
__decorate([
    (0, common_1.Get)(':relationshipId/recent'),
    __param(0, (0, common_1.Param)('relationshipId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConflictsController.prototype, "getRecentConflicts", null);
exports.ConflictsController = ConflictsController = __decorate([
    (0, common_1.Controller)('conflicts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [conflicts_service_1.ConflictsService])
], ConflictsController);
//# sourceMappingURL=conflicts.controller.js.map