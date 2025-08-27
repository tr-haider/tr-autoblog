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
var SchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const blog_generator_service_1 = require("../blog-generator/blog-generator.service");
const email_service_1 = require("../email-service/email.service");
const topic_research_service_1 = require("../topic-research/topic-research.service");
let SchedulerService = SchedulerService_1 = class SchedulerService {
    blogGeneratorService;
    emailService;
    topicResearchService;
    logger = new common_1.Logger(SchedulerService_1.name);
    constructor(blogGeneratorService, emailService, topicResearchService) {
        this.blogGeneratorService = blogGeneratorService;
        this.emailService = emailService;
        this.topicResearchService = topicResearchService;
    }
    async handleWeeklyBlogGeneration() {
        this.logger.log('Starting weekly blog generation...');
        try {
            const blogs = await this.blogGeneratorService.generateTrendingBlogs(3);
            if (blogs.length > 0) {
                for (const blog of blogs) {
                    if (!blog.docxBuffer) {
                        const docxBuffer = await this.blogGeneratorService['createDocxDocument'](blog);
                        blog.docxBuffer = docxBuffer;
                    }
                }
                const emailSent = await this.emailService.sendWeeklyBlogDigest(blogs);
                if (emailSent) {
                    this.logger.log(`Weekly blog generation completed successfully. Generated ${blogs.length} blogs with DOCX attachments.`);
                }
                else {
                    this.logger.error('Failed to send weekly digest email');
                }
            }
            else {
                this.logger.warn('No blogs were generated for weekly digest');
            }
        }
        catch (error) {
            this.logger.error('Error in weekly blog generation:', error.message);
        }
    }
    async handleDailyBlogGeneration() {
        this.logger.log('Starting daily blog generation...');
        try {
            const result = await this.blogGeneratorService.generateBlogFromTrendingTopic();
            if (result.success && result.blogPost) {
                if (!result.blogPost.docxBuffer) {
                    const docxBuffer = await this.blogGeneratorService['createDocxDocument'](result.blogPost);
                    result.blogPost.docxBuffer = docxBuffer;
                }
                const emailSent = await this.emailService.sendBlogToMarketingTeam(result.blogPost);
                if (emailSent) {
                    this.logger.log('Daily blog generation and email completed successfully with DOCX');
                }
                else {
                    this.logger.error('Failed to send daily blog email');
                }
            }
            else {
                this.logger.warn('Daily blog generation failed:', result.error);
            }
        }
        catch (error) {
            this.logger.error('Error in daily blog generation:', error.message);
        }
    }
    async triggerWeeklyGeneration() {
        try {
            this.logger.log('Manually triggering weekly blog generation...');
            await this.handleWeeklyBlogGeneration();
            return {
                success: true,
                message: 'Weekly blog generation completed successfully'
            };
        }
        catch (error) {
            this.logger.error('Manual weekly generation failed:', error.message);
            return {
                success: false,
                message: `Weekly generation failed: ${error.message}`
            };
        }
    }
    async triggerDailyGeneration() {
        try {
            this.logger.log('Manually triggering daily blog generation...');
            await this.handleDailyBlogGeneration();
            return {
                success: true,
                message: 'Daily blog generation completed successfully'
            };
        }
        catch (error) {
            this.logger.error('Manual daily generation failed:', error.message);
            return {
                success: false,
                message: `Daily generation failed: ${error.message}`
            };
        }
    }
};
exports.SchedulerService = SchedulerService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_WEEK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerService.prototype, "handleWeeklyBlogGeneration", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_9AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerService.prototype, "handleDailyBlogGeneration", null);
exports.SchedulerService = SchedulerService = SchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [blog_generator_service_1.BlogGeneratorService,
        email_service_1.EmailService,
        topic_research_service_1.TopicResearchService])
], SchedulerService);
//# sourceMappingURL=scheduler.service.js.map