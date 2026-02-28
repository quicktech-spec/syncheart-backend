"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckinsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const checkins_service_1 = require("./checkins.service");
const checkins_controller_1 = require("./checkins.controller");
const checkin_entity_1 = require("../entities/checkin.entity");
const relationship_entity_1 = require("../entities/relationship.entity");
const user_entity_1 = require("../entities/user.entity");
let CheckinsModule = class CheckinsModule {
};
exports.CheckinsModule = CheckinsModule;
exports.CheckinsModule = CheckinsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([checkin_entity_1.Checkin, relationship_entity_1.Relationship, user_entity_1.User])],
        providers: [checkins_service_1.CheckinsService],
        controllers: [checkins_controller_1.CheckinsController],
        exports: [checkins_service_1.CheckinsService],
    })
], CheckinsModule);
//# sourceMappingURL=checkins.module.js.map