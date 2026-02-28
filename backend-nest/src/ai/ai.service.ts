import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiInsight } from '../entities/ai-insight.entity';
import { CheckinsService } from '../checkins/checkins.service';
import { ConflictsService } from '../conflicts/conflicts.service';
import OpenAI from 'openai';

@Injectable()
export class AiService {
    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'dummy_key_for_build' });

    constructor(
        @InjectRepository(AiInsight)
        private aiInsightRepository: Repository<AiInsight>,
        private checkinsService: CheckinsService,
        private conflictsService: ConflictsService,
    ) { }

    async generateRewrite(text: string): Promise<string> {
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
        } catch (error) {
            console.error(`[AI Engine Failed] Fallback rewrite.`, error);
            return `(Empathetic Rewrite) ${text} ... I want us to understand each other.`;
        }
    }

    async predictDrift(relationshipId: string): Promise<any> {
        // Short-term memory aggregate (Last 14 days)
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
        } catch (error) {
            console.error(`[AI Engine Failed] Fallback predict.`, error);
            // Fallbacks based on basic rule logic
            if (recentConflicts.length > 2) { aiResult.prediction = 'high'; aiResult.suggested_adjustment = -15; }
            else if (recentCheckins.some(c => c.mood_score < 5)) { aiResult.prediction = 'moderate'; aiResult.suggested_adjustment = -5; }
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
}
