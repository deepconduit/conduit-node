import * as request from "request";
import Utils from "./utils";
import AuthUtils from "./auth.utils";
import {ConduitConfig} from "./config";


export class RestClient{

    constructor(private config: ConduitConfig){}

    public send(options : any, callback?: Function){


        let headers = options.headers || {};
        let method = options.method || "post";

        let date = Utils.unixDateTime(new Date);
        let path = this.config.prefixPath(options.path);
        let url =  this.config.baseUrl + path;
        let body = JSON.stringify(options.body);

        let contentType = "application/json";


        // Default headers
        headers["Authorization"] = AuthUtils.create(this.config,{url, method, body, contentType, date});
        headers["Content-Type"] =  contentType;
        headers["Date"]=  date;


        let reqOptions = {
            "body": body,
            "headers": headers,
        };


       // console.log(reqOptions);


        request[method](url, reqOptions,(err, response, body) => {
            this.handleResponse(err,response,body,callback);
        });

    }


    private handleResponse(err,res,resBody,callback){
        if(typeof callback !== "function"){
            return;
        }

        let body = resBody ? JSON.parse(resBody) : null;
        callback(err,res,body);
    }


    private ensureString(obj: Object){
        return obj ? JSON.stringify(obj) : undefined;
    }
}