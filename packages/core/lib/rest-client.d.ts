import { ConduitConfig } from "./config";
export declare class RestClient {
    private config;
    constructor(config: ConduitConfig);
    send(options: any, callback?: Function): void;
    private handleResponse(err, res, resBody, callback);
    private ensureString(obj);
}
