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
exports.CheckinsController = void 0;
const common_1 = require("@nestjs/common");
const checkins_service_1 = require("./checkins.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let CheckinsController = class CheckinsController {
    constructor(checkinsService) {
        this.checkinsService = checkinsService;
    }
    async createCheckin(req, relationshipId, checkinData) {
        return this.checkinsService.createCheckin(req.user.id, relationshipId, checkinData);
    }
    async getRecentCheckins(relationshipId) {
        return this.checkinsService.getRecentCheckins(relationshipId);
    }
};
exports.CheckinsController = CheckinsController;
__decorate([
    (0, common_1.Post)(':relationshipId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('relationshipId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CheckinsController.prototype, "createCheckin", null);
__decorate([
    (0, common_1.Get)(':relationshipId/recent'),
    __param(0, (0, common_1.Param)('relationshipId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CheckinsController.prototype, "getRecentCheckins", null);
exports.CheckinsController = CheckinsController = __decorate([
    (0, common_1.Controller)('checkins'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [checkins_service_1.CheckinsService])
], CheckinsController);
//# sourceMappingURL=checkins.controller.js.map