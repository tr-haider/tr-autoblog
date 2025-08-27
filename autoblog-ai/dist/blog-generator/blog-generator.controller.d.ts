import { Response } from 'express';
import { BlogGeneratorService } from './blog-generator.service';
import { BlogGenerationDto } from '../dto/blog.dto';
import { BlogGenerationResponse, BlogPost } from '../interfaces/blog.interface';
export declare class BlogGeneratorController {
    private readonly blogGeneratorService;
    constructor(blogGeneratorService: BlogGeneratorService);
    generateBlogPost(request: BlogGenerationDto): Promise<BlogGenerationResponse>;
    generateBlogPostAsDocx(request: BlogGenerationDto, res: Response): Promise<void>;
    downloadBlogAsDocx(blogPost: any, res: Response): Promise<void>;
    downloadBlogAsHtml(blogPost: any, res: Response): Promise<void>;
    generateAndSaveBlog(request: BlogGenerationDto): Promise<BlogGenerationResponse>;
    generateAndEmailBlog(request: BlogGenerationDto): Promise<BlogGenerationResponse>;
    generateBlogFromTrendingTopic(): Promise<BlogGenerationResponse>;
    generateTrendingBlogs(count?: number): Promise<BlogPost[]>;
    getAvailableTopics(): Promise<string[]>;
    getSuggestedTopics(): Promise<any[]>;
    getSeparatedLinks(): Promise<{
        resources: any[];
        blogs: any[];
    }>;
    loadMoreBlogLinks(page: string): Promise<{
        blogs: any[];
    }>;
    healthCheck(): Promise<{
        status: string;
        timestamp: string;
    }>;
}
