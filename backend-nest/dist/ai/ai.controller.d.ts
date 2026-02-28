import { AiService } from './ai.service';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    rewriteMessage(body: {
        text: string;
    }): Promise<{
        original: string;
        suggested: string;
    }>;
    predictDrift(relationshipId: string): Promise<any>;
}
