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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relationship = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const checkin_entity_1 = require("./checkin.entity");
const conflict_entity_1 = require("./conflict.entity");
const ai_insight_entity_1 = require("./ai-insight.entity");
let Relationship = class Relationship {
};
exports.Relationship = Relationship;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Relationship.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.relationshipsAsPartner1),
    (0, typeorm_1.JoinColumn)({ name: 'partner_1_id' }),
    __metadata("design:type", user_entity_1.User)
], Relationship.prototype, "partner_1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.relationshipsAsPartner2),
    (0, typeorm_1.JoinColumn)({ name: 'partner_2_id' }),
    __metadata("design:type", user_entity_1.User)
], Relationship.prototype, "partner_2", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'active' }),
    __metadata("design:type", String)
], Relationship.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Relationship.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => checkin_entity_1.Checkin, checkin => checkin.relationship),
    __metadata("design:type", Array)
], Relationship.prototype, "checkins", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => conflict_entity_1.Conflict, conflict => conflict.relationship),
    __metadata("design:type", Array)
], Relationship.prototype, "conflicts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ai_insight_entity_1.AiInsight, insight => insight.relationship),
    __metadata("design:type", Array)
], Relationship.prototype, "insights", void 0);
exports.Relationship = Relationship = __decorate([
    (0, typeorm_1.Entity)('relationships')
], Relationship);
//# sourceMappingURL=relationship.entity.js.map