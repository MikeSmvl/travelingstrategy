import Client from 'predicthq';
// Initialises PredictHQ client library using your access token
const client = new Client({access_token: '3ezKmlrAYq3QMDt3d-wZh2q-oBVt57U0c_CfJiax'});
const phqEvents = client.events;
// conferences, expos, concerts, festivals, performing-arts, sports, community
const logEventsToConsole = events => {
    for (const event of events) {
        // See https://developer.predicthq.com/resources/events/#fields for list of all event fields.
        console.log(event);
        console.log("category: ",event.category)
        console.log("description: ",event.description)
        console.log("duration: ",event.duration)
        console.log("start: ",event.start)
        console.log("end: ",event.end)
        console.log("title: ",event.title)
        console.log("labels: ",event.labels)
        console.log("state: ",event.state)
        console.log("scope: ",event.scope)
        console.log("entities: ",event.entities)
        console.log();
    }
};
// Basic event search using title as parameter. By default, it will return the first ten events.
const basicSearch = ()=>{
    // Event search using `within` parameter.
    const withinParam = '40.7127753,-74.0059728';
    phqEvents.search({
        "location_around.origin": withinParam,
        "category":"expos"
                    })
    .then(logEventsToConsole)
    .catch(err => console.error(err));
}



export default basicSearch
