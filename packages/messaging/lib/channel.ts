import {MessagingConfig} from "./interfaces/messaging-config.interface";
import {RestClient} from "@deepconduit/core";

export class Channel{
    
    constructor(private name: string | Array<string>, private config : MessagingConfig, private restClient: RestClient){}

    /**
     * Send HTTP POST Request to conduit
     * to emit an event to the channel

     * POST https://api.conduit/messaging/APP_ID/events
     *
     * @param eventName
     * @param data
     * @param socketName
     */
    public publish(eventName: string, data: Object, socketName?: string) {


        return new Promise((resolve, reject)=> {

            //path for this request
            let path = `/messaging/apps/${this.config.appId}/events`;

            //Make it as an array to support emitting to multiple channels
            let channels =  Array.isArray(this.name) ? this.name : [this.name];

            let body = {
                channels: channels,
                event: eventName,
                data: data,
                socket: socketName || null
            };

            this.restClient.send({"path": path, "body": body,}, function (err, res, resBody) {
                if (err)
                    return reject(err);

                if(resBody.code === 200)
                    return resolve(resBody);
                else
                    return reject(resBody);

            });

        });

    }


    /**
     * Send HTTP POST Request to ranse
     * to emit a socket in the channel
     *
     * @param socketName
     * @param eventName
     * @param data
     */
    public publishToSocket(socketName: string, eventName: string, data: Object){
        return this.publish(eventName,data,socketName);
    }

    
}