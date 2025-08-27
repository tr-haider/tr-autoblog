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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogGeneratorController = void 0;
const common_1 = require("@nestjs/common");
const blog_generator_service_1 = require("./blog-generator.service");
const blog_dto_1 = require("../dto/blog.dto");
let BlogGeneratorController = class BlogGeneratorController {
    blogGeneratorService;
    constructor(blogGeneratorService) {
        this.blogGeneratorService = blogGeneratorService;
    }
    async generateBlogPost(request) {
        return this.blogGeneratorService.generateBlogPost(request);
    }
    async generateBlogPostAsDocx(request, res) {
        const result = await this.blogGeneratorService.generateBlogPostAsDocx(request);
        if (result.success && result.blogPost && result.blogPost.docxBuffer) {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename="${result.blogPost.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.docx"`);
            res.send(result.blogPost.docxBuffer);
        }
        else {
            res.status(400).json({
                success: false,
                error: result.error || 'Failed to generate DOCX document',
            });
        }
    }
    async downloadBlogAsDocx(blogPost, res) {
        try {
            console.log('Received blog post for DOCX download:', JSON.stringify(blogPost, null, 2));
            const docxBuffer = await this.blogGeneratorService.createDocxFromBlog(blogPost);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename="${blogPost.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.docx"`);
            res.send(docxBuffer);
        }
        catch (error) {
            console.error('DOCX download error:', error);
            res.status(400).json({
                success: false,
                error: 'Failed to generate DOCX document: ' + error.message,
            });
        }
    }
    async downloadBlogAsHtml(blogPost, res) {
        try {
            console.log('Received blog post for HTML download:', JSON.stringify(blogPost, null, 2));
            const htmlBuffer = await this.blogGeneratorService.createHtmlFromBlog(blogPost);
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Content-Disposition', `attachment; filename="${blogPost.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html"`);
            res.send(htmlBuffer);
        }
        catch (error) {
            console.error('HTML download error:', error);
            res.status(400).json({
                success: false,
                error: 'Failed to generate HTML document: ' + error.message,
            });
        }
    }
    async generateAndSaveBlog(request) {
        return this.blogGeneratorService.generateAndSaveBlog(request);
    }
    async generateAndEmailBlog(request) {
        return this.blogGeneratorService.generateAndEmailBlog(request);
    }
    async generateBlogFromTrendingTopic() {
        return this.blogGeneratorService.generateBlogFromTrendingTopic();
    }
    async generateTrendingBlogs(count = 3) {
        return this.blogGeneratorService.generateTrendingBlogs(count);
    }
    async getAvailableTopics() {
        return [
            'HIPAA Compliance Best Practices',
            'Healthcare AI Trends',
            'Regulatory Updates',
            'Data Security in Healthcare',
            'AI in Medical Imaging',
            'Telemedicine Regulations',
            'Healthcare Data Privacy',
            'AI Ethics in Healthcare',
            'Digital Health Innovation',
            'Healthcare Cybersecurity',
        ];
    }
    async getSuggestedTopics() {
        return this.blogGeneratorService.generateSuggestedTopics();
    }
    async getSeparatedLinks() {
        return this.blogGeneratorService.getSeparatedLinks();
    }
    async loadMoreBlogLinks(page) {
        const pageNumber = parseInt(page, 10);
        if (isNaN(pageNumber) || pageNumber < 1) {
            throw new Error('Invalid page number');
        }
        const blogs = await this.blogGeneratorService.loadMoreBlogLinks(pageNumber);
        return { blogs };
    }
    async healthCheck() {
        return {
            status: 'healthy',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.BlogGeneratorController = BlogGeneratorController;
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.BlogGenerationDto]),
    __metadata("design:returntype", Promise)
], BlogGeneratorController.prototype, "generateBlogPost", null);
__decorate([
    (0, common_1.Post)('generate-docx'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.BlogGenerationDto, Object]),
    __metadata("design:returntype", Promise)
], BlogGeneratorController.prototype, "generateBlogPostAsDocx", null);
__decorate([
    (0, common_1.Post)('download-docx'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogGeneratorController.prototype, "downloadBlogAsDocx", null);
__decorate([
    (0, common_1.Post)('download-html'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogGeneratorController.prototype, "downloadBlogAsHtml", null);
__decorate([
    (0, common_1.Post)('generate-and-save'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.BlogGenerationDto]),
    __metadata("design:returntype", Promise)
], BlogGeneratorController.prototype, "generateAndSaveBlog", null);
__decorate([
    (0, common_1.Post)('generate-and-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.BlogGenerationDto]),
    __metadata("design:returntype", Promise)
], BlogGeneratorController.prototype, "generateAndEmailBlog", null);
__decorate([
    (0, common_1.Post)('generate-trending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogGeneratorController.prototype, "generateBlogFromTrendingTopic", null);
__decorate([
    (0, common_1.Post)('generate-trending-weekly'),
    __param(0, (0, common_1.Query)('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogGeneratorController.prototype, "generateTrendingBlogs", null);
__decorate([
    (0, common_1.Get)('topics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogGeneratorController.prototype, "getAvailableTopics", null);
__decorate([
    (0, common_1.Get)('suggested-topics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogGeneratorController.prototype, "getSuggestedTopics", null);
__decorate([
    (0, common_1.Get)('separated-links'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogGeneratorController.prototype, "getSeparatedLinks", null);
__decorate([
    (0, common_1.Get)('load-more-blogs/:page'),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogGeneratorController.prototype, "loadMoreBlogLinks", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogGeneratorController.prototype, "healthCheck", null);
exports.BlogGeneratorController = BlogGeneratorController = __decorate([
    (0, common_1.Controller)('blog-generator'),
    __metadata("design:paramtypes", [blog_generator_service_1.BlogGeneratorService])
], BlogGeneratorController);
//# sourceMappingURL=blog-generator.controller.js.map