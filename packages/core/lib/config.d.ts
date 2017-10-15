export declare class ConduitConfig {
    readonly version: number;
    host: string;
    scheme: string;
    port: string;
    accessKeyId: string;
    accessSecretKey: string;
    constructor(options: any);
    private ensureIsProperlyConfigured();
    readonly baseUrl: string;
    prefixPath(subPath: any): string;
}
