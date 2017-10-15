import {MessagingConfig} from "./interfaces/messaging-config.interface";
import {RestClient, ConduitConfig, ConduitConfigFactory} from "@deepconduit/core";
import {Channel} from "./channel";


export class MessagingClient{

    private config: MessagingConfig;
    private restClient: RestClient;

    constructor(conduitConfig: string | object | ConduitConfig, serviceConfig : MessagingConfig){
        this.config = serviceConfig;

        this.restClient = new RestClient(ConduitConfigFactory.create(conduitConfig));
    }

    public getOpenChannel(){
        return new Channel([], this.config, this.restClient);
    }

    public useChannel(name: string | Array<string>){
        return new Channel(name, this.config, this.restClient);
    }


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
    public trigger(channelName: string | Array<string>, eventName: string, data: Object, socketName?: string) {
        let channel = this.useChannel(channelName);
        channel.publish(eventName,data,socketName)

    }

}