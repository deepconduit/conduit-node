import { ConduitConfig } from "./config";
export default class AuthUtils {
    static readonly STRING_SEPARATOR: string;
    static create(config: ConduitConfig, payload: any): string;
    static getStringToSignFromReq(payload: any): string;
    static getMessageSignature(accessSecretKey: string, message: string): string;
    static toBase64(str: any): string;
}
