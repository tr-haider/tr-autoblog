"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TopicResearchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicResearchService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const cheerio = require("cheerio");
let TopicResearchService = TopicResearchService_1 = class TopicResearchService {
    configService;
    logger = new common_1.Logger(TopicResearchService_1.name);
    constructor(configService) {
        this.configService = configService;
    }
    async getTrendingTopics() {
        const topics = [];
        try {
            const sources = [
                { url: 'https://healthitsecurity.com', selector: 'h2, h3' },
                { url: 'https://hipaajournal.com', selector: 'h2, h3' },
                { url: 'https://healthcare.ai', selector: 'h2, h3' }
            ];
            for (const source of sources) {
                try {
                    const response = await axios_1.default.get(source.url, {
                        timeout: 10000,
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                        }
                    });
                    const $ = cheerio.load(response.data);
                    const titles = $(source.selector);
                    titles.each((_, element) => {
                        const title = $(element).text().trim();
                        if (this.isRelevantTopic(title)) {
                            const cleanTitle = this.cleanTitle(title);
                            const keywords = this.extractKeywords(cleanTitle);
                            const category = this.categorizeTopic(cleanTitle);
                            const relevance = this.calculateRelevance(cleanTitle, keywords);
                            topics.push({
                                title: cleanTitle,
                                description: `Latest insights on ${cleanTitle.toLowerCase()}`,
                                keywords,
                                source: source.url,
                                relevance,
                                category
                            });
                        }
                    });
                }
                catch (error) {
                    this.logger.warn(`Failed to scrape ${source.url}: ${error.message}`);
                }
            }
            const uniqueTopics = this.removeDuplicateTopics(topics);
            return uniqueTopics.sort((a, b) => b.relevance - a.relevance);
        }
        catch (error) {
            this.logger.error('Error fetching trending topics:', error.message);
            return this.getFallbackTopics();
        }
    }
    async getRandomTrendingTopic() {
        const topics = await this.getTrendingTopics();
        if (topics.length === 0) {
            return this.getFallbackTopics()[0];
        }
        const totalWeight = topics.reduce((sum, topic) => sum + topic.relevance, 0);
        let random = Math.random() * totalWeight;
        for (const topic of topics) {
            random -= topic.relevance;
            if (random <= 0) {
                return topic;
            }
        }
        return topics[0];
    }
    getCuratedTrendingTopics() {
        return [
            {
                title: 'Solving Code Review Bottlenecks with AI-Powered Development Tools',
                description: 'How AI is revolutionizing code review processes and accelerating software development',
                keywords: ['code review', 'AI tools', 'software development', 'automation', 'productivity'],
                source: 'curated',
                relevance: 10,
                category: 'software-development'
            },
            {
                title: 'Overcoming Legacy System Integration Challenges with Modern APIs',
                description: 'Strategies for integrating legacy healthcare systems with modern software solutions',
                keywords: ['legacy systems', 'API integration', 'healthcare software', 'modernization'],
                source: 'curated',
                relevance: 9,
                category: 'software-development'
            },
            {
                title: 'Reducing Software Development Costs with AI-Driven Automation',
                description: 'How AI automation is cutting development costs and improving efficiency',
                keywords: ['cost reduction', 'AI automation', 'software development', 'efficiency'],
                source: 'curated',
                relevance: 9,
                category: 'software-development'
            },
            {
                title: 'Solving Mobile App Performance Issues with Advanced Optimization Techniques',
                description: 'Addressing common mobile app performance problems with modern development solutions',
                keywords: ['mobile app performance', 'optimization', 'software development', 'user experience'],
                source: 'curated',
                relevance: 8,
                category: 'software-development'
            },
            {
                title: 'Overcoming Healthcare Data Security Challenges with Blockchain Solutions',
                description: 'How blockchain technology is solving healthcare data security and compliance issues',
                keywords: ['blockchain', 'healthcare security', 'data protection', 'compliance'],
                source: 'curated',
                relevance: 10,
                category: 'software-development'
            },
            {
                title: 'Solving Software Testing Bottlenecks with AI-Powered Test Automation',
                description: 'How AI is revolutionizing software testing and quality assurance processes',
                keywords: ['software testing', 'AI automation', 'quality assurance', 'development'],
                source: 'curated',
                relevance: 9,
                category: 'software-development'
            },
            {
                title: 'Overcoming Cloud Migration Challenges in Healthcare Software',
                description: 'Solving common cloud migration problems for healthcare applications',
                keywords: ['cloud migration', 'healthcare software', 'AWS', 'Azure', 'security'],
                source: 'curated',
                relevance: 8,
                category: 'software-development'
            },
            {
                title: 'Solving User Experience Problems in Healthcare Mobile Apps',
                description: 'Addressing UX challenges in healthcare applications with modern design solutions',
                keywords: ['user experience', 'mobile apps', 'healthcare', 'design', 'usability'],
                source: 'curated',
                relevance: 8,
                category: 'software-development'
            }
        ];
    }
    getFallbackTopics() {
        return [
            {
                title: 'Solving Software Development Bottlenecks with AI-Powered Solutions',
                description: 'How AI is addressing common software development challenges and improving efficiency',
                keywords: ['software development', 'AI solutions', 'automation', 'productivity', 'bottlenecks'],
                source: 'fallback',
                relevance: 10,
                category: 'software-development'
            },
            {
                title: 'Overcoming Healthcare Software Integration Challenges with Modern APIs',
                description: 'Solving integration problems in healthcare software with modern development techniques',
                keywords: ['healthcare software', 'API integration', 'modernization', 'development'],
                source: 'fallback',
                relevance: 9,
                category: 'software-development'
            }
        ];
    }
    isRelevantTopic(title) {
        const lowerTitle = title.toLowerCase();
        const relevantTerms = [
            'ai', 'artificial intelligence', 'hipaa', 'healthcare', 'medical',
            'privacy', 'security', 'compliance', 'regulation', 'machine learning',
            'data', 'patient', 'clinical', 'digital health'
        ];
        return relevantTerms.some(term => lowerTitle.includes(term));
    }
    cleanTitle(title) {
        return title
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 200);
    }
    extractKeywords(title) {
        const keywords = [];
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('ai') || lowerTitle.includes('artificial intelligence'))
            keywords.push('AI');
        if (lowerTitle.includes('hipaa') || lowerTitle.includes('compliance'))
            keywords.push('HIPAA compliance');
        if (lowerTitle.includes('healthcare') || lowerTitle.includes('medical'))
            keywords.push('healthcare');
        if (lowerTitle.includes('privacy') || lowerTitle.includes('security'))
            keywords.push('data security');
        if (lowerTitle.includes('machine learning') || lowerTitle.includes('ml'))
            keywords.push('machine learning');
        return keywords.length > 0 ? keywords : ['healthcare technology', 'AI', 'compliance'];
    }
    extractCategory(title) {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('hipaa') || lowerTitle.includes('compliance')) {
            return 'hipaa-compliance';
        }
        else if (lowerTitle.includes('regulation') || lowerTitle.includes('ethics')) {
            return 'ai-regulation';
        }
        else if (lowerTitle.includes('ai') || lowerTitle.includes('machine learning')) {
            return 'ai-healthcare';
        }
        else {
            return 'healthcare-tech';
        }
    }
    calculateRelevance(title, keywords) {
        let relevance = 5;
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('hipaa'))
            relevance += 3;
        if (lowerTitle.includes('ai') || lowerTitle.includes('artificial intelligence'))
            relevance += 2;
        if (lowerTitle.includes('healthcare'))
            relevance += 2;
        if (lowerTitle.includes('privacy') || lowerTitle.includes('security'))
            relevance += 2;
        if (lowerTitle.includes('compliance'))
            relevance += 2;
        relevance += Math.min(keywords.length * 0.5, 3);
        return Math.min(relevance, 10);
    }
    categorizeTopic(title) {
        return this.extractCategory(title);
    }
    removeDuplicateTopics(topics) {
        const seen = new Set();
        return topics.filter(topic => {
            const key = topic.title.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }
};
exports.TopicResearchService = TopicResearchService;
exports.TopicResearchService = TopicResearchService = TopicResearchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TopicResearchService);
//# sourceMappingURL=topic-research.service.js.map