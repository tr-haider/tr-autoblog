export interface ResourceLink {
    title: string;
    url: string;
    category: string;
    type: 'resource' | 'blog';
    description?: string;
}
export declare class WebScraperService {
    private readonly logger;
    scrapeResourceLinks(): Promise<ResourceLink[]>;
    scrapeBlogLinks(): Promise<ResourceLink[]>;
    scrapeBlogLinksFromPage(page: number): Promise<ResourceLink[]>;
    scrapeMultipleBlogPages(startPage: number, endPage: number): Promise<ResourceLink[]>;
    private deduplicateBlogs;
    private extractBlogLinksFromPage;
    private inferCategoryFromTitle;
    private extractDescriptionForBlogPost;
    getAllLinks(): Promise<{
        resources: ResourceLink[];
        blogs: ResourceLink[];
    }>;
    private getFallbackResourceLinks;
    private getFallbackBlogLinks;
}
