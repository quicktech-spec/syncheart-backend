import { CheckinsService } from './checkins.service';
export declare class CheckinsController {
    private readonly checkinsService;
    constructor(checkinsService: CheckinsService);
    createCheckin(req: any, relationshipId: string, checkinData: any): Promise<import("../entities/checkin.entity").Checkin>;
    getRecentCheckins(relationshipId: string): Promise<import("../entities/checkin.entity").Checkin[]>;
}
