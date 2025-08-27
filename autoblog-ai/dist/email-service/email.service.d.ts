import { ConfigService } from '@nestjs/config';
import { BlogPost } from '../interfaces/blog.interface';
export declare class EmailService {
    private configService;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService);
    private initializeTransporter;
    sendBlogToMarketingTeam(blogPost: BlogPost): Promise<boolean>;
    sendWeeklyBlogDigest(blogPosts: BlogPost[]): Promise<boolean>;
    private createBlogEmailTemplate;
    private createWeeklyDigestTemplate;
    private createDocxDocument;
    private createHtmlDocument;
}
