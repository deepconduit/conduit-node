import { MessagingConfig } from "./interfaces/messaging-config.interface";
import { RestClient } from "@deepconduit/core";
export declare class Channel {
    private name;
    private config;
    private restClient;
    constructor(name: string | Array<string>, config: MessagingConfig, restClient: RestClient);
    /**
     * Send HTTP POST Request to conduit
     * to emit an event to the channel

     * POST https://api.conduit/messaging/APP_ID/events
     *
     * @param eventName
     * @param data
     * @param socketName
     */
    publish(eventName: string, data: Object, socketName?: string): Promise<{}>;
    /**
     * Send HTTP POST Request to ranse
     * to emit a socket in the channel
     *
     * @param socketName
     * @param eventName
     * @param data
     */
    publishToSocket(socketName: string, eventName: string, data: Object): Promise<{}>;
}
