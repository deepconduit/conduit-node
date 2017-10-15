import { MessagingConfig } from "./interfaces/messaging-config.interface";
import { ConduitConfig } from "@deepconduit/core";
import { Channel } from "./channel";
export declare class MessagingClient {
    private config;
    private restClient;
    constructor(conduitConfig: string | object | ConduitConfig, serviceConfig: MessagingConfig);
    getOpenChannel(): Channel;
    useChannel(name: string | Array<string>): Channel;
    /**
     * Send HTTP POST Request to conduit
     * to emit an event to the channel

     * POST https://api.conduit/messaging/APP_ID/events
     *
     * @param channelName
     * @param eventName
     * @param data
     * @param socketName
     */
    trigger(channelName: string | Array<string>, eventName: string, data: Object, socketName?: string): void;
}
