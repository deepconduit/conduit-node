"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var moment = require("moment-timezone");
var Utils = (function () {
    function Utils() {
    }
    Utils.genRandomID = function () {
        return crypto.createHash('md5').update(crypto.randomBytes(16)).digest('hex');
    };
    /**
     * Merge object `b` with object `a`.
     *
     * @param a
     * @param  b
     * @return a
     */
    Utils.merge = function (a, b) {
        var keys = Object.keys(b);
        for (var i = 0, len = keys.length; i < len; ++i) {
            var key = keys[i];
            a[key] = b[key];
        }
        return a;
    };
    ;
    Utils.unixDateTime = function (date) {
        return moment.utc(date).valueOf();
    };
    return Utils;
}());
exports.default = Utils;
