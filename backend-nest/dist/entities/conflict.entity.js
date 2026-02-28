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
exports.Conflict = void 0;
const typeorm_1 = require("typeorm");
const relationship_entity_1 = require("./relationship.entity");
let Conflict = class Conflict {
};
exports.Conflict = Conflict;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Conflict.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => relationship_entity_1.Relationship, rel => rel.conflicts),
    (0, typeorm_1.JoinColumn)({ name: 'relationship_id' }),
    __metadata("design:type", relationship_entity_1.Relationship)
], Conflict.prototype, "relationship", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Conflict.prototype, "trigger_category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Conflict.prototype, "intensity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'unresolved' }),
    __metadata("design:type", String)
], Conflict.prototype, "resolution_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Conflict.prototype, "private_notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Conflict.prototype, "created_at", void 0);
exports.Conflict = Conflict = __decorate([
    (0, typeorm_1.Entity)('conflicts')
], Conflict);
//# sourceMappingURL=conflict.entity.js.map