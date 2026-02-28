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
exports.AiInsight = void 0;
const typeorm_1 = require("typeorm");
const relationship_entity_1 = require("./relationship.entity");
let AiInsight = class AiInsight {
};
exports.AiInsight = AiInsight;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AiInsight.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => relationship_entity_1.Relationship, rel => rel.insights),
    (0, typeorm_1.JoinColumn)({ name: 'relationship_id' }),
    __metadata("design:type", relationship_entity_1.Relationship)
], AiInsight.prototype, "relationship", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AiInsight.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-json'),
    __metadata("design:type", Object)
], AiInsight.prototype, "payload", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AiInsight.prototype, "created_at", void 0);
exports.AiInsight = AiInsight = __decorate([
    (0, typeorm_1.Entity)('ai_insights')
], AiInsight);
//# sourceMappingURL=ai-insight.entity.js.map