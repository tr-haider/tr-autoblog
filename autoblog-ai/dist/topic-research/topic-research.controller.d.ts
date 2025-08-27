import { TopicResearchService, TrendingTopic } from './topic-research.service';
export declare class TopicResearchController {
    private readonly topicResearchService;
    constructor(topicResearchService: TopicResearchService);
    getTrendingTopics(): Promise<TrendingTopic[]>;
    getRandomTrendingTopic(): Promise<TrendingTopic>;
}
