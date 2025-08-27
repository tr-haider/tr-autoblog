export declare class BlogGenerationDto {
    topic: string;
    keywords?: string[];
    targetWordCount?: number;
    tone?: 'professional' | 'casual' | 'technical' | 'executive';
    includeRegulatoryInfo?: boolean;
    selectedLinks?: string[];
}
export declare class BlogPostDto {
    title: string;
    summary: string;
    content: string;
    topic: string;
    keywords: string[];
    wordCount: number;
    readingTime: number;
    status: string;
    createdAt: string;
}
