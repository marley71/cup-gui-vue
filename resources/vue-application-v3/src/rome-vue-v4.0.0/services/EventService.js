export default class EventService {
    getEvents() {
        return import('@/rome-vue-v4.0.0/assets/demo/data/events.json')
            .then((res) => res.data)
            .then((d) => d.data);
    }
}
