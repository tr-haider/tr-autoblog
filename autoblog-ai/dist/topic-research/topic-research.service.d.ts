import { ConfigService } from '@nestjs/config';
export interface TrendingTopic {
    title: string;
    description: string;
    keywords: string[];
    source: string;
    relevance: number;
    category: 'ai-healthcare' | 'hipaa-compliance' | 'healthcare-tech' | 'ai-regulation' | 'software-development';
}
export declare class TopicResearchService {
    private configService;
    private readonly logger;
    constructor(configService: ConfigService);
    getTrendingTopics(): Promise<TrendingTopic[]>;
    getRandomTrendingTopic(): Promise<TrendingTopic>;
    private getCuratedTrendingTopics;
    private getFallbackTopics;
    private isRelevantTopic;
    private cleanTitle;
    private extractKeywords;
    private extractCategory;
    private calculateRelevance;
    private categorizeTopic;
    private removeDuplicateTopics;
}
