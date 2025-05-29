export default class EventService {
    getEvents() {
        return import('@external/public/demo/data/events.json')
            .then((res) => res.data)
            .then((d) => d.data);
    }
}
