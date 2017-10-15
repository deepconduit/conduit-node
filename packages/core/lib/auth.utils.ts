import * as crypto from "crypto";
import {ConduitConfig} from "./config";
import Utils from "./utils";

export default class AuthUtils{
    public static readonly STRING_SEPARATOR = "=&=";
    
    public static create(config: ConduitConfig, payload: any){
        let stringToSign = AuthUtils.getStringToSignFromReq(payload);
        let signature = AuthUtils.toBase64(AuthUtils.getMessageSignature(config.accessSecretKey, encodeURIComponent(stringToSign)));

        return `CSR ${config.accessKeyId}:${signature}`;
    }


    public static getStringToSignFromReq(payload: any){
        let method = payload.method.toUpperCase();
        let url = payload.url;
        let contentType = payload.contentType;
        let date = payload.date;
        let body = payload.body;
        let contentLength = new Buffer(body).length;


        return [method, url,contentType,date ,contentLength, body].join(AuthUtils.STRING_SEPARATOR);
    }

    public static getMessageSignature(accessSecretKey: string, message: string){
        let hmac = crypto.createHmac('sha256', accessSecretKey);
        hmac.update(message);
        return hmac.digest('hex');
    }


    public static toBase64(str){
        return Buffer.from(str).toString('base64');
    }

}