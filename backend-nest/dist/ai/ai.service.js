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
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ai_insight_entity_1 = require("../entities/ai-insight.entity");
const checkins_service_1 = require("../checkins/checkins.service");
const conflicts_service_1 = require("../conflicts/conflicts.service");
const openai_1 = require("openai");
let AiService = class AiService {
    constructor(aiInsightRepository, checkinsService, conflictsService) {
        this.aiInsightRepository = aiInsightRepository;
        this.checkinsService = checkinsService;
        this.conflictsService = conflictsService;
        this.openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY || 'dummy_key_for_build' });
    }
    async generateRewrite(text) {
        const systemPrompt = "You are an emotionally intelligent relationship coach. Rewrite the following message to soften the tone and increase emotional intelligence while keeping the core message exactly the same.";
        console.log(`[AI Engine] Executing rewrite...`);
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: text }
                ],
                max_tokens: 150,
                temperature: 0.7,
            });
            return response.choices[0]?.message?.content || text;
        }
        catch (error) {
            console.error(`[AI Engine Failed] Fallback rewrite.`, error);
            return `(Empathetic Rewrite) ${text} ... I want us to understand each other.`;
        }
    }
    async predictDrift(relationshipId) {
        const recentCheckins = await this.checkinsService.getRecentCheckins(relationshipId);
        const recentConflicts = await this.conflictsService.getRecentConflicts(relationshipId);
        const checkinSummaries = recentCheckins.map(c => `Mood: ${c.mood_score}, Stress: ${c.stress_score}, Needs: ${c.need_type}`);
        const conflictSummaries = recentConflicts.map(c => `Trigger: ${c.trigger_category}, Intensity: ${c.intensity}, Notes: ${c.private_notes ? 'Encrypted Data' : 'None'}`);
        const prompt = `You are an AI Relationship analyst. Evaluate the following last 14 days of relationship data and predict the emotional drift. Return exactly JSON containing { "prediction": "low|moderate|high", "suggested_adjustment": <number from -20 to 20>, "summary": "<1 paragraph insight>" }.
Data Checkins: ${JSON.stringify(checkinSummaries)}
Data Conflicts: ${JSON.stringify(conflictSummaries)}`;
        let aiResult = {
            prediction: 'low',
            suggested_adjustment: 0,
            summary: "You are doing great."
        };
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4',
                messages: [{ role: 'system', content: prompt }],
                temperature: 0.2,
                response_format: { type: "json_object" }
            });
            if (response.choices[0]?.message?.content) {
                aiResult = JSON.parse(response.choices[0].message.content);
            }
        }
        catch (error) {
            console.error(`[AI Engine Failed] Fallback predict.`, error);
            if (recentConflicts.length > 2) {
                aiResult.prediction = 'high';
                aiResult.suggested_adjustment = -15;
            }
            else if (recentCheckins.some(c => c.mood_score < 5)) {
                aiResult.prediction = 'moderate';
                aiResult.suggested_adjustment = -5;
            }
        }
        const payload = {
            analyzed_at: new Date().toISOString(),
            prediction: aiResult.prediction,
            suggested_adjustment: aiResult.suggested_adjustment,
            summary: aiResult.summary,
            context_used: {
                checkin_count: recentCheckins.length,
                conflict_count: recentConflicts.length
            }
        };
        const insight = this.aiInsightRepository.create({
            relationship: { id: relationshipId },
            type: 'drift_prediction',
            payload: payload
        });
        await this.aiInsightRepository.save(insight);
        return insight;
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ai_insight_entity_1.AiInsight)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        checkins_service_1.CheckinsService,
        conflicts_service_1.ConflictsService])
], AiService);
//# sourceMappingURL=ai.service.js.map