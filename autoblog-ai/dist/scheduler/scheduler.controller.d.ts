import { SchedulerService } from './scheduler.service';
export declare class SchedulerController {
    private readonly schedulerService;
    constructor(schedulerService: SchedulerService);
    triggerWeeklyGeneration(): Promise<{
        success: boolean;
        message: string;
    }>;
    triggerDailyGeneration(): Promise<{
        success: boolean;
        message: string;
    }>;
    getStatus(): Promise<{
        status: string;
        timestamp: string;
        message: string;
    }>;
}
