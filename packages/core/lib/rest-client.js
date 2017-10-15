"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var utils_1 = require("./utils");
var auth_utils_1 = require("./auth.utils");
var RestClient = (function () {
    function RestClient(config) {
        this.config = config;
    }
    RestClient.prototype.send = function (options, callback) {
        var _this = this;
        var headers = options.headers || {};
        var method = options.method || "post";
        var date = utils_1.default.unixDateTime(new Date);
        var path = this.config.prefixPath(options.path);
        var url = this.config.baseUrl + path;
        var body = JSON.stringify(options.body);
        var contentType = "application/json";
        // Default headers
        headers["Authorization"] = auth_utils_1.default.create(this.config, { url: url, method: method, body: body, contentType: contentType, date: date });
        headers["Content-Type"] = contentType;
        headers["Date"] = date;
        var reqOptions = {
            "body": body,
            "headers": headers,
        };
        // console.log(reqOptions);
        request[method](url, reqOptions, function (err, response, body) {
            _this.handleResponse(err, response, body, callback);
        });
    };
    RestClient.prototype.handleResponse = function (err, res, resBody, callback) {
        if (typeof callback !== "function") {
            return;
        }
        var body = resBody ? JSON.parse(resBody) : null;
        callback(err, res, body);
    };
    RestClient.prototype.ensureString = function (obj) {
        return obj ? JSON.stringify(obj) : undefined;
    };
    return RestClient;
}());
exports.RestClient = RestClient;
