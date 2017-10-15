"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_exception_1 = require("./config.exception");
var constants_1 = require("./constants");
var ConduitConfig = (function () {
    function ConduitConfig(options) {
        this.version = constants_1.CONDUIT_API_VERSION;
        //Optional Configurations;
        this.scheme = options.scheme ? options.scheme : (!options.encrypted ? "http" : "https");
        this.port = options.port ? ':' + options.port : '';
        this.host = options.host ? options.host : constants_1.CONDUIT_API_HOST;
        //Required Configurations
        this.accessKeyId = options.key;
        this.accessSecretKey = options.secret;
        this.ensureIsProperlyConfigured();
    }
    ConduitConfig.prototype.ensureIsProperlyConfigured = function () {
        if (typeof this.accessKeyId !== "string")
            throw new config_exception_1.ConduitConfigException("Conduit Key is required");
        if (typeof this.accessSecretKey !== "string")
            throw new config_exception_1.ConduitConfigException("Conduit Secret is required");
    };
    Object.defineProperty(ConduitConfig.prototype, "baseUrl", {
        get: function () {
            return this.scheme + '://' + this.host + this.port;
        },
        enumerable: true,
        configurable: true
    });
    ConduitConfig.prototype.prefixPath = function (subPath) {
        return "/v" + this.version + subPath;
    };
    ;
    return ConduitConfig;
}());
exports.ConduitConfig = ConduitConfig;
