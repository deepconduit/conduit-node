"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var AuthUtils = (function () {
    function AuthUtils() {
    }
    AuthUtils.create = function (config, payload) {
        var stringToSign = AuthUtils.getStringToSignFromReq(payload);
        var signature = AuthUtils.toBase64(AuthUtils.getMessageSignature(config.accessSecretKey, encodeURIComponent(stringToSign)));
        return "CSR " + config.accessKeyId + ":" + signature;
    };
    AuthUtils.getStringToSignFromReq = function (payload) {
        var method = payload.method.toUpperCase();
        var url = payload.url;
        var contentType = payload.contentType;
        var date = payload.date;
        var body = payload.body;
        var contentLength = new Buffer(body).length;
        return [method, url, contentType, date, contentLength, body].join(AuthUtils.STRING_SEPARATOR);
    };
    AuthUtils.getMessageSignature = function (accessSecretKey, message) {
        var hmac = crypto.createHmac('sha256', accessSecretKey);
        hmac.update(message);
        return hmac.digest('hex');
    };
    AuthUtils.toBase64 = function (str) {
        return Buffer.from(str).toString('base64');
    };
    AuthUtils.STRING_SEPARATOR = "=&=";
    return AuthUtils;
}());
exports.default = AuthUtils;
