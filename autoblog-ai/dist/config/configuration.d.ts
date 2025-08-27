declare const _default: () => {
    port: number;
    llm: {
        provider: string;
        model: string;
        apiKey: string | undefined;
        baseUrl: string | undefined;
    };
    email: {
        host: string;
        port: number;
        secure: boolean;
        auth: {
            user: string | undefined;
            pass: string | undefined;
        };
    };
    marketing: {
        teamEmails: string[];
        weeklySchedule: string;
    };
    blog: {
        topics: string[];
        seoKeywords: string[];
        internalLinks: Array<{
            text: string;
            url: string;
            category: string;
        }>;
        downloadableResources: string[];
    };
};
export default _default;
