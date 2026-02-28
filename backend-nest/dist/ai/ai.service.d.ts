import { Repository } from 'typeorm';
import { AiInsight } from '../entities/ai-insight.entity';
import { CheckinsService } from '../checkins/checkins.service';
import { ConflictsService } from '../conflicts/conflicts.service';
export declare class AiService {
    private aiInsightRepository;
    private checkinsService;
    private conflictsService;
    private openai;
    constructor(aiInsightRepository: Repository<AiInsight>, checkinsService: CheckinsService, conflictsService: ConflictsService);
    generateRewrite(text: string): Promise<string>;
    predictDrift(relationshipId: string): Promise<any>;
}
