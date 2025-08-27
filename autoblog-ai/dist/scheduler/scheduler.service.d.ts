import { BlogGeneratorService } from '../blog-generator/blog-generator.service';
import { EmailService } from '../email-service/email.service';
import { TopicResearchService } from '../topic-research/topic-research.service';
export declare class SchedulerService {
    private blogGeneratorService;
    private emailService;
    private topicResearchService;
    private readonly logger;
    constructor(blogGeneratorService: BlogGeneratorService, emailService: EmailService, topicResearchService: TopicResearchService);
    handleWeeklyBlogGeneration(): Promise<void>;
    handleDailyBlogGeneration(): Promise<void>;
    triggerWeeklyGeneration(): Promise<{
        success: boolean;
        message: string;
    }>;
    triggerDailyGeneration(): Promise<{
        success: boolean;
        message: string;
    }>;
}
