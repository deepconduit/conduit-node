import {ConduitConfigException} from "./config.exception";
import {CONDUIT_API_HOST, CONDUIT_API_VERSION} from "./constants";

export class ConduitConfig{
    public readonly version : number =  CONDUIT_API_VERSION;

    public host: string;
    public scheme : string;
    public port : string;
    public accessKeyId : string;
    public accessSecretKey : string;

    constructor(options : any){

        //Optional Configurations;
        this.scheme = options.scheme ? options.scheme : (!options.encrypted ? "http" : "https");
        this.port = options.port ? ':' + options.port : '';
        this.host = options.host ? options.host : CONDUIT_API_HOST;

        //Required Configurations
        this.accessKeyId = options.key;
        this.accessSecretKey = options.secret;

        this.ensureIsProperlyConfigured();
    }


    private ensureIsProperlyConfigured(){

        if(typeof this.accessKeyId !== "string")
            throw new ConduitConfigException("Conduit Key is required");

        if(typeof this.accessSecretKey !== "string")
            throw new ConduitConfigException("Conduit Secret is required");

    }
    public get baseUrl(){
        return this.scheme + '://' + this.host + this.port;
    }


    public prefixPath(subPath) {
        return "/v" + this.version + subPath;
    };


}