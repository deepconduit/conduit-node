"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var messaging_1 = require("@deepconduit/messaging");
var client = new messaging_1.MessagingClient(process.env.CONDUIT_URL, { appId: process.env.CONDUIT_APP_ID });
client.useChannel("home_channel").publish("event_name", { name: "ore" })
    .then(function (res) { return console.log(res); })
    .catch(function (err) { return console.log(err); });
