export default class PhotoService {
    getImages() {
        return fetch('@/rome-vue-v4.0.0/assets/demo/data/photos.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }
}
