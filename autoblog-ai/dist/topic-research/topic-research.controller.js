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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicResearchController = void 0;
const common_1 = require("@nestjs/common");
const topic_research_service_1 = require("./topic-research.service");
let TopicResearchController = class TopicResearchController {
    topicResearchService;
    constructor(topicResearchService) {
        this.topicResearchService = topicResearchService;
    }
    async getTrendingTopics() {
        return this.topicResearchService.getTrendingTopics();
    }
    async getRandomTrendingTopic() {
        return this.topicResearchService.getRandomTrendingTopic();
    }
};
exports.TopicResearchController = TopicResearchController;
__decorate([
    (0, common_1.Get)('trending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TopicResearchController.prototype, "getTrendingTopics", null);
__decorate([
    (0, common_1.Get)('random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TopicResearchController.prototype, "getRandomTrendingTopic", null);
exports.TopicResearchController = TopicResearchController = __decorate([
    (0, common_1.Controller)('topic-research'),
    __metadata("design:paramtypes", [topic_research_service_1.TopicResearchService])
], TopicResearchController);
//# sourceMappingURL=topic-research.controller.js.map