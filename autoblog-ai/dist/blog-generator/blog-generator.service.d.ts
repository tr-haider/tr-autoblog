import { ConfigService } from '@nestjs/config';
import { BlogPost, BlogGenerationRequest, BlogGenerationResponse } from '../interfaces/blog.interface';
import { EmailService } from '../email-service/email.service';
import { TopicResearchService } from '../topic-research/topic-research.service';
import { WebScraperService, ResourceLink } from '../web-scraper/web-scraper.service';
export declare class BlogGeneratorService {
    private configService;
    private emailService;
    private topicResearchService;
    private webScraperService;
    private readonly logger;
    private llm;
    constructor(configService: ConfigService, emailService: EmailService, topicResearchService: TopicResearchService, webScraperService: WebScraperService);
    generateBlogPost(request: BlogGenerationRequest): Promise<BlogGenerationResponse>;
    generateBlogPostAsDocx(request: BlogGenerationRequest): Promise<BlogGenerationResponse>;
    generateAndSaveBlog(request: BlogGenerationRequest): Promise<BlogGenerationResponse>;
    generateAndEmailBlog(request: BlogGenerationRequest): Promise<BlogGenerationResponse>;
    generateBlogFromTrendingTopic(): Promise<BlogGenerationResponse>;
    generateTrendingBlogs(count?: number): Promise<BlogPost[]>;
    getSeparatedLinks(): Promise<{
        resources: ResourceLink[];
        blogs: ResourceLink[];
    }>;
    loadMoreBlogLinks(page: number): Promise<ResourceLink[]>;
    generateSuggestedTopics(): Promise<any[]>;
    private generateFallbackTopics;
    private createBlogPrompt;
    private parseBlogResponse;
    private createDocxDocument;
    private parseHtmlToElements;
    private parseTextWithFormatting;
    private stripHtmlTags;
    private createHtmlDocument;
    createDocxFromBlog(blogPost: any): Promise<Buffer>;
    createHtmlFromBlog(blogPost: any): Promise<Buffer>;
    private calculateWordCount;
    private calculateReadingTime;
}
