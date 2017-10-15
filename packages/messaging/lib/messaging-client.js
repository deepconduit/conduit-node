"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@deepconduit/core");
var channel_1 = require("./channel");
var MessagingClient = (function () {
    function MessagingClient(conduitConfig, serviceConfig) {
        this.config = serviceConfig;
        this.restClient = new core_1.RestClient(core_1.ConduitConfigFactory.create(conduitConfig));
    }
    MessagingClient.prototype.getOpenChannel = function () {
        return new channel_1.Channel([], this.config, this.restClient);
    };
    MessagingClient.prototype.useChannel = function (name) {
        return new channel_1.Channel(name, this.config, this.restClient);
    };
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
    MessagingClient.prototype.trigger = function (channelName, eventName, data, socketName) {
        var channel = this.useChannel(channelName);
        channel.publish(eventName, data, socketName);
    };
    return MessagingClient;
}());
exports.MessagingClient = MessagingClient;
