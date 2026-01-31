export type SentryLogParams = {
    message: string;
    reason?: string;
    level?: 'fatal' | 'error' | 'warning' | 'info' | 'debug' | 'log';
    category?: string;
    data?: Record<string, unknown>;
    extra?: Record<string, unknown>;
    tags?: Record<string, string>;
    user?: {
        id?: string;
        email?: string;
    };
    contexts?: Record<string, Record<string, unknown>>;
    scope?: (scope: any) => void;
};
export declare const logSentryMessageWithBreadcrumb: (params: SentryLogParams) => Promise<void>;
