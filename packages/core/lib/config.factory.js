"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var URL = require("url");
var config_1 = require("./config");
var config_exception_1 = require("./config.exception");
var utils_1 = require("./utils");
var ConduitConfigFactory = (function () {
    function ConduitConfigFactory() {
    }
    ConduitConfigFactory.create = function (config) {
        if (typeof config == "undefined")
            throw new config_exception_1.ConduitConfigException("A Conduit config is required");
        var conduitConfig;
        if (config instanceof config_1.ConduitConfig)
            conduitConfig = config;
        else if (typeof config == "string")
            conduitConfig = ConduitConfigFactory.createFromUrl(config);
        else if (typeof config == "object")
            conduitConfig = new config_1.ConduitConfig(config);
        return conduitConfig;
    };
    /**
     * Allows creation of Ranse from a url
     *
     * SCHEME://APP_KEY:SECRET_KEY@HOST:PORT
     *
     * @param apiUrl
     * @param options
     * @returns {Object}
     */
    ConduitConfigFactory.createFromUrl = function (apiUrl, options) {
        if (options === void 0) { options = {}; }
        var url = URL.parse(apiUrl);
        var path = url.pathname.split("/");
        var auth = url.auth.split(":");
        var mergedOptions = utils_1.default.merge(options, {
            scheme: url.protocol.replace(/:$/, ""),
            host: url.hostname,
            port: parseInt(url.port, 10) || undefined,
            key: auth[0],
            secret: auth[1]
        });
        return new config_1.ConduitConfig(mergedOptions);
    };
    return ConduitConfigFactory;
}());
exports.ConduitConfigFactory = ConduitConfigFactory;
