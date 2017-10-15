import * as URL from "url";
import {ConduitConfig} from "./config";
import {ConduitConfigException} from "./config.exception";
import Utils from "./utils";

export class ConduitConfigFactory{

    public static create(config: string | object | ConduitConfig):  ConduitConfig{
        if(typeof config == "undefined")
            throw new ConduitConfigException("A Conduit config is required");

        let conduitConfig;

        if(config instanceof ConduitConfig)
            conduitConfig = config;

        else if (typeof config == "string")
            conduitConfig =  ConduitConfigFactory.createFromUrl(config);

        else if(typeof config == "object")
            conduitConfig  = new ConduitConfig(config);

        return conduitConfig;

    }

    /**
     * Allows creation of Ranse from a url
     *
     * SCHEME://APP_KEY:SECRET_KEY@HOST:PORT
     *
     * @param apiUrl
     * @param options
     * @returns {Object}
     */

    public static createFromUrl(apiUrl: string, options: object = {}){

        let url = URL.parse(apiUrl);
        let path = url.pathname.split("/");
        let auth = url.auth.split(":");


        let mergedOptions = Utils.merge(options, {
            scheme: url.protocol.replace(/:$/, ""),
            host: url.hostname,
            port: parseInt(url.port, 10) || undefined,
            key: auth[0],
            secret: auth[1]
        });


        return new ConduitConfig(mergedOptions);

    }
}