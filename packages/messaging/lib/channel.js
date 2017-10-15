"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Channel = (function () {
    function Channel(name, config, restClient) {
        this.name = name;
        this.config = config;
        this.restClient = restClient;
    }
    /**
     * Send HTTP POST Request to conduit
     * to emit an event to the channel

     * POST https://api.conduit/messaging/APP_ID/events
     *
     * @param eventName
     * @param data
     * @param socketName
     */
    Channel.prototype.publish = function (eventName, data, socketName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //path for this request
            var path = "/messaging/apps/" + _this.config.appId + "/events";
            //Make it as an array to support emitting to multiple channels
            var channels = Array.isArray(_this.name) ? _this.name : [_this.name];
            var body = {
                channels: channels,
                event: eventName,
                data: data,
                socket: socketName || null
            };
            _this.restClient.send({ "path": path, "body": body, }, function (err, res, resBody) {
                if (err)
                    return reject(err);
                if (resBody.code === 200)
                    return resolve(resBody);
                else
                    return reject(resBody);
            });
        });
    };
    /**
     * Send HTTP POST Request to ranse
     * to emit a socket in the channel
     *
     * @param socketName
     * @param eventName
     * @param data
     */
    Channel.prototype.publishToSocket = function (socketName, eventName, data) {
        return this.publish(eventName, data, socketName);
    };
    return Channel;
}());
exports.Channel = Channel;
