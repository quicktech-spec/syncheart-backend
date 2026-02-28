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
exports.Checkin = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const relationship_entity_1 = require("./relationship.entity");
let Checkin = class Checkin {
};
exports.Checkin = Checkin;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Checkin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.checkins),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Checkin.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => relationship_entity_1.Relationship, rel => rel.checkins),
    (0, typeorm_1.JoinColumn)({ name: 'relationship_id' }),
    __metadata("design:type", relationship_entity_1.Relationship)
], Checkin.prototype, "relationship", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Checkin.prototype, "mood_score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Checkin.prototype, "stress_score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Checkin.prototype, "energy_score", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Checkin.prototype, "need_type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Checkin.prototype, "created_at", void 0);
exports.Checkin = Checkin = __decorate([
    (0, typeorm_1.Entity)('checkins')
], Checkin);
//# sourceMappingURL=checkin.entity.js.map