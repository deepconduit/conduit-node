import { ConduitConfig } from "./config";
export declare class ConduitConfigFactory {
    static create(config: string | object | ConduitConfig): ConduitConfig;
    /**
     * Allows creation of Ranse from a url
     *
     * SCHEME://APP_KEY:SECRET_KEY@HOST:PORT
     *
     * @param apiUrl
     * @param options
     * @returns {Object}
     */
    static createFromUrl(apiUrl: string, options?: object): ConduitConfig;
}
