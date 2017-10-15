import {MessagingClient} from "@deepconduit/messaging";

const client =  new MessagingClient(process.env.CONDUIT_URL, {appId : process.env.CONDUIT_APP_ID});

client.useChannel("home_channel").publish("event_name", {name: "ore"})
    .then((res) => console.log(res))
    .catch(err => console.log(err));
