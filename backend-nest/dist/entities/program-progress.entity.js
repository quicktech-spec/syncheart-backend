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
exports.ProgramProgress = void 0;
const typeorm_1 = require("typeorm");
const program_entity_1 = require("./program.entity");
const relationship_entity_1 = require("./relationship.entity");
let ProgramProgress = class ProgramProgress {
};
exports.ProgramProgress = ProgramProgress;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], ProgramProgress.prototype, "program_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], ProgramProgress.prototype, "relationship_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => program_entity_1.Program),
    (0, typeorm_1.JoinColumn)({ name: 'program_id' }),
    __metadata("design:type", program_entity_1.Program)
], ProgramProgress.prototype, "program", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => relationship_entity_1.Relationship),
    (0, typeorm_1.JoinColumn)({ name: 'relationship_id' }),
    __metadata("design:type", relationship_entity_1.Relationship)
], ProgramProgress.prototype, "relationship", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], ProgramProgress.prototype, "progress_percentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ProgramProgress.prototype, "completed_tasks", void 0);
exports.ProgramProgress = ProgramProgress = __decorate([
    (0, typeorm_1.Entity)('program_progress')
], ProgramProgress);
//# sourceMappingURL=program-progress.entity.js.map